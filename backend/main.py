from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, logger
import uvicorn
import os
from pydantic import BaseModel, Field
from utility import *
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
    argon2__memory_cost=102400,   # 100 MB (tune based on server)
    argon2__time_cost=2,          # iterations
    argon2__parallelism=8         # threads
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# instantiate the application
app = FastAPI()

# Food search request model
class FoodSearchRequest(BaseModel):
    query: str = None
    diet: str = None
    course: str = None
    cuisine: str = None

class RestrauntSearchRequest(BaseModel):
    query: str = None

class TravelStoryRequest(BaseModel):
    user_id: str
    expedition_type: str
    title: str
    description: str
    location: str
    date: str
    images: list[str]
    tags: list[str]
    likes: int = 0
    comments: list[dict] = []

class UserSignup(BaseModel):
    email: str
    password: str = Field(min_length=8, max_length=128)
    name: str

class Token(BaseModel):
    access_token: str
    token_type: str


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def verify_and_update_password(plain_password: str, hashed_password: str) -> tuple[bool, str | None]:
    verified, new_hash = pwd_context.verify_and_update(plain_password, hashed_password)
    return verified, new_hash

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user_by_email(email: str):
    collection = get_mongo_collection("users")
    return collection.find_one({"email": email})

def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)
    if not user:
        return None

    verified, new_hash = verify_and_update_password(password, user["password"])

    if not verified:
        return None

    # 🔄 Auto-upgrade hash if needed
    if new_hash:
        collection = get_mongo_collection("users")
        collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"password": new_hash}}
        )

    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/get_cuisines")
async def get_cuisines():
    collection = get_mongo_collection("cuisines")
    if collection is None:
        return {"cuisines": []}
    cusines = []
    for item in collection.find():
        cusines.append({
            "id" : str(item["_id"]),
            "name" : str(item["name"]).replace("Recipe", "").strip(),
            "image_url" : str(item["image_url"]),
            "description" : str(item["description"]),
            "course" : str(item["course"]),
            "diet" : str(item["diet"]),
            "cuisine" : str(item["cuisine"]),
            "ingredients" : str(item["ingredients"]),
            "instructions" : str(item["instructions"])
        })
    return {"cuisines": cusines}

@app.post("/get_food_search")
async def food_search(request: FoodSearchRequest):
    collection = get_mongo_collection("cuisines")
    if collection is None:
        return {"cuisines": []}
    cusines = []
    for item in collection.find():
        if string_match_score(request.query, item["name"]) >= 0.6 or request.query is None:
            if request.diet is not None:
                if request.diet.lower().strip() != item["diet"].lower().strip():
                    continue
            if request.course is not None:
                if request.course.lower().strip() != item["course"].lower().strip():
                    continue
            if request.cuisine is not None:
                if string_match_score(request.cuisine, item["cuisine"]) < 0.6:
                    continue
            cusines.append({
                "id" : str(item["_id"]),
                "name" : str(item["name"]).replace("Recipe", "").strip(),
                "image_url" : str(item["image_url"]),
                "description" : str(item["description"]),
                "course" : str(item["course"]),
                "diet" : str(item["diet"]),
                "cuisine" : str(item["cuisine"]),
                "ingredients" : str(item["ingredients"]),
                "instructions" : str(item["instructions"])
            })
    return {"cuisines": cusines}

@app.post("/get_restraunts")
async def get_restraunts(request: RestrauntSearchRequest):

    collection = get_mongo_collection("restraunts")
    query = request.query.lower().strip()
    restraunts = []

    if collection.count_documents({}) == 0:

        response = request_ola_maps_api(query)

        if response.status_code == 200:
            data = response.json()

            for item in data.get("predictions", []):

                restraunt_data = {
                    "place_id": str(item.get("place_id", "")),
                    "name": str(item.get("name", "")),
                    "formatted_address": str(item.get("formatted_address", "")),
                    "lat": float(item.get("geometry", {}).get("location", {}).get("lat", 0.0)),
                    "lng": float(item.get("geometry", {}).get("location", {}).get("lng", 0.0)),
                    "query": str(query)
                }

                restraunts.append(restraunt_data)
                try:
                    collection.insert_one(restraunt_data)
                except Exception as e:
                    print(f"Error inserting document into MongoDB: {e}")

            return jsonable_encoder({"results": restraunts}, custom_encoder={ObjectId: str})

        else:
            print(f"Error fetching data from OLA Maps API: {response.status_code}")
            return jsonable_encoder({"results": []}, custom_encoder={ObjectId: str})

    else:

        for item in collection.find({}, {"_id": 0}):
            if string_match_score(query, item.get("query", "")) >= 0.9:

                restraunt_data = {
                    "place_id": str(item.get("place_id", "")),
                    "name": str(item.get("name", "")),
                    "formatted_address": str(item.get("formatted_address", "")),
                    "lat": float(item.get("lat", 0.0)),
                    "lng": float(item.get("lng", 0.0))
                }

                restraunts.append(restraunt_data)

        if len(restraunts) == 0:

            response = request_ola_maps_api(query)

            if response.status_code == 200:
                data = response.json()

                for item in data.get("predictions", []):

                    restraunt_data = {
                        "place_id": str(item.get("place_id", "")),
                        "name": str(item.get("name", "")),
                        "formatted_address": str(item.get("formatted_address", "")),
                        "lat": float(item.get("geometry", {}).get("location", {}).get("lat", 0.0)),
                        "lng": float(item.get("geometry", {}).get("location", {}).get("lng", 0.0)),
                        "query": str(query)
                    }

                    restraunts.append(restraunt_data)
                    try:
                        collection.insert_one(restraunt_data)
                    except Exception as e:
                        print(f"Error inserting document into MongoDB: {e}")

        return jsonable_encoder({"results": restraunts}, custom_encoder={ObjectId: str})

@app.post("/create_travel_story")
async def create_travel_story(
    request: TravelStoryRequest,
    current_user: dict = Depends(get_current_user)
):
    collection = get_mongo_collection("travel_stories")
    if collection is None:
        return jsonable_encoder({"message": "Failed to connect to database"}, custom_encoder={ObjectId: str})

    story_data = {
        "user_id": current_user["email"],
        "expedition_type": request.expedition_type,
        "title": request.title,
        "description": request.description,
        "location": request.location,
        "date": request.date,
        "images": request.images,
        "tags": request.tags,
        "likes": request.likes,
        "comments": request.comments
    }
    story_data["status"] = "pending"

    try:
        result = collection.insert_one(story_data)
        return jsonable_encoder({"message": "Travel story created successfully", "story_id": str(result.inserted_id)}, custom_encoder={ObjectId: str})
    except Exception as e:
        print(f"Error inserting document into MongoDB: {e}")
        return jsonable_encoder({"message": "Failed to create travel story"}, custom_encoder={ObjectId: str})

@app.get("/get_travel_stories")
async def get_travel_stories():
    collection = get_mongo_collection("travel_stories")
    if collection is None:
        return jsonable_encoder({"travel_stories": []}, custom_encoder={ObjectId: str})

    travel_stories = []
    for item in collection.find():
        travel_stories.append({
            "id": str(item["_id"]),
            "user_id": item["user_id"],
            "expedition_type": item["expedition_type"],
            "title": item["title"],
            "description": item["description"],
            "location": item["location"],
            "date": item["date"],
            "images": item["images"],
            "tags": item["tags"],
            "status": item["status"],
            "likes": item["likes"],
            "comments": item["comments"]
        })

    return jsonable_encoder({"travel_stories": travel_stories}, custom_encoder={ObjectId: str})

@app.put("/update_travel_story/{story_id}")
async def update_travel_story(story_id: str, request: TravelStoryRequest, current_user: dict = Depends(get_current_user)):
    collection = get_mongo_collection("travel_stories")
    if collection is None:
        return jsonable_encoder({"message": "Failed to connect to database"}, custom_encoder={ObjectId: str})

    story_data = {
        "user_id": current_user["email"],
        "expedition_type": request.expedition_type,
        "title": request.title,
        "description": request.description,
        "location": request.location,
        "date": request.date,
        "images": request.images,
        "tags": request.tags,
        "likes": request.likes if hasattr(request, "likes") else 0,
        "comments": request.comments if hasattr(request, "comments") else []
    }
    story_data["status"] = "pending"

    try:
        result = collection.update_one({"_id": ObjectId(story_id)}, {"$set": story_data})
        if result.modified_count > 0:
            return jsonable_encoder({"message": "Travel story updated successfully"}, custom_encoder={ObjectId: str})
        else:
            return jsonable_encoder({"message": "No changes made to the travel story"}, custom_encoder={ObjectId: str})
    except Exception as e:
        print(f"Error updating document in MongoDB: {e}")
        return jsonable_encoder({"message": "Failed to update travel story"}, custom_encoder={ObjectId: str})

@app.delete("/delete_travel_story/{story_id}")
async def delete_travel_story(story_id: str, current_user: dict = Depends(get_current_user)):
    collection = get_mongo_collection("travel_stories")
    if collection is None:
        return jsonable_encoder({"message": "Failed to connect to database"}, custom_encoder={ObjectId: str})

    try:
        result = collection.delete_one({"_id": ObjectId(story_id)})
        if result.deleted_count > 0:
            return jsonable_encoder({"message": "Travel story deleted successfully"}, custom_encoder={ObjectId: str})
        else:
            return jsonable_encoder({"message": "Travel story not found"}, custom_encoder={ObjectId: str})
    except Exception as e:
        print(f"Error deleting document from MongoDB: {e}")
        return jsonable_encoder({"message": "Failed to delete travel story"}, custom_encoder={ObjectId: str})

@app.post("/signup")
async def signup(user: UserSignup):
    collection = get_mongo_collection("users")

    existing_user = collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = {
        "email": user.email,
        "name": user.name,
        "password": hash_password(user.password)
    }

    result = collection.insert_one(user_data)

    return {"message": "User created successfully", "user_id": str(result.inserted_id)}

@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user["email"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {"access_token": access_token, "token_type": "bearer"}



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)