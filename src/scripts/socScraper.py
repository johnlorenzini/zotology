import requests
import json
import urllib.parse
import time

cleaned2 = []
with open('sorted.json', 'r') as openfile:
    formatted = json.load(openfile)
    for course in formatted:
        course_comment = course['courseComment']
        course_number = course['courseNumber']
        dept_name = course['deptCode']
        prereqs = course['prerequisiteLink']
        course_title = course['courseTitle']
        for section in course:
            section['course_comment'] = course_comment
            section['course_number'] = course_number
            section['dept_name'] = dept_name
            section['prereqs'] = prereqs
            section['course_title'] = course_title
            
    
    
    with open('sorted.json', 'w') as outfile:
        json.dump(cleaned2, outfile)
            