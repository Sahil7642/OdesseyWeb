import re
from difflib import SequenceMatcher
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import requests
import urllib.parse
    
load_dotenv()

def string_match_score(str1: str, str2: str) -> float:
    _word_re = re.compile(r"[a-z0-9]+")
    
    def _tokens(s: str) -> list[str]:
        return _word_re.findall(s.lower())
    
    def _sim(a: str, b: str) -> float:
        return SequenceMatcher(None, a, b).ratio()
    
    def fuzzy_match_score(s1: str, s2: str) -> float:
        t1 = _tokens(s1)
        t2 = _tokens(s2)
    
        if not t1 and not t2:
            return 1.0
        if not t1 or not t2:
            return 0.0
    
        # For each token in t1, find best match in t2
        best1 = [max(_sim(w, v) for v in t2) for w in t1]
        # For each token in t2, find best match in t1
        best2 = [max(_sim(v, w) for w in t1) for v in t2]
    
        # Symmetric score: average of both directions
        return (sum(best1) / len(best1) + sum(best2) / len(best2)) / 2.0
    return fuzzy_match_score(str1, str2)

def get_mongo_collection(collection_name: str):
    try:
        mongo_uri = os.getenv("MONGO_URI")
        db_name = os.getenv("DB_NAME")
        client = MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]
        return collection
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

def encode_uri_component(text: str) -> str:
    """
    Encodes a string similar to JavaScript's encodeURIComponent.
    Uses UTF-8 encoding and encodes all special characters.
    """
    if not isinstance(text, str):
        raise TypeError("Input must be a string")
    
    # safe='' ensures all special characters are encoded
    return urllib.parse.quote(text, safe='', encoding='utf-8')

def request_ola_maps_api(query: str):
    OLA_MAPS_API_KEY = os.getenv("OLA_MAPS_API_KEY")
    response = requests.get(
        "https://api.olamaps.io/places/v1/textsearch",
        headers={
        "X-Request-Id": "",
        "X-Correlation-Id": ""
        },
        params={
        "input": query,
        "location": "",
        "radius": "5000",
        "types": "",
        "size": "50",
        "api_key": OLA_MAPS_API_KEY,
        }
    )
    return response