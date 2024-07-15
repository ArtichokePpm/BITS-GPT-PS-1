from pymongo import MongoClient

client = MongoClient('mongodb://125.22.54.196:5000/')
db = client['Chatbot']

class Department:
    def __init__(self, dept_name, prog_name, dept_id):
        self.dept_name = dept_name
        self.prog_name = prog_name
        self.dept_id = dept_id

class Course:
    def __init__(self, course_name, file_path, department_id, course_id):
        self.course_name = course_name
        self.file_path = file_path
        self.department_id = department_id
        self.course_id = course_id

class User:
    def __init__(self, username, details):
        self.username = username
        self.details = details

departments_collection = db['Departments']
courses_collection = db['Courses']
users_collection = db['Users']
admins_collection = db['Admins']
user_details_collection = db['UserDetails']
