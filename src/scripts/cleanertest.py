import json

with open('sections.json', 'r') as openfile:
    json_object = json.load(openfile)
    for obj in json_object:
        print(obj['schools'][0]['departments'][0]['courses'])