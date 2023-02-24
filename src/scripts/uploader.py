import json
from dotenv import dotenv_values
from supabase import create_client



config = dotenv_values(".env")
API_URL = config["NEXT_PUBLIC_SUPABASE_URL"]
API_KEY = config["NEXT_PUBLIC_SUPABASE_SECRET_KEY"]

supabase = create_client(API_URL, API_KEY)

with open('sections2.json', 'r' ) as openfile:
    json_object = json.load(openfile)
    for section in json_object:
        supabase.table("sections").insert(section).execute()