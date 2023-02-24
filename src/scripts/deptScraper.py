import json
impor

sections = []
with open('sections2.json', 'r' ) as openfile:
    json_object = json.load(openfile)
    for section in json_object:
        