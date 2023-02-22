import json

depts = set()
with open('cleaned.json', 'r') as openfile:
    json_object = json.load(openfile)
    for obj in json_object:
        depts.add(obj['deptCode'])
    
with open('depts.json', 'w') as outfile:
    json.dump(list(depts), outfile)
        