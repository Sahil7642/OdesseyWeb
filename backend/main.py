from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI, logger
import uvicorn
import os
from pydantic import BaseModel
from utility import *

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



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)