import requests
import json
import urllib.parse
import time

cleaned2 = []
with open('formatted.json', 'r') as openfile:
    formatted = json.load(openfile)
    cleaned2 = sorted(formatted, key=lambda k: (k['deptCode'], k['courseNumber']))
    
    
    with open('sorted.json', 'w') as outfile:
        json.dump(cleaned2, outfile)
            