import requests
import json
import urllib.parse
import time
 
formatted = dict()

cleaned2 = []
with open('formatted.json', 'r') as openfile:
    formatted = json.load(openfile)
    for course in formatted:
        tempcourse = course
        for sections in course:
            