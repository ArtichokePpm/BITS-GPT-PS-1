from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from PIL import Image
import io
import base64
from pymongo import MongoClient
from bson import ObjectId
import datetime
import openai
import re

app = Flask(__name__)
app.secret_key = 'test@123'
openai.api_key = 'secret_key' #ask Climetaverse-IT team for key

# MongoDB connection configurations
chatbot_client = MongoClient('mongodb://125.22.54.196:5000/')
knowledge_base_client = MongoClient('mongodb://125.22.54.196:5000/')

chatbot_db = chatbot_client['Chatbot']
knowledge_base_db = knowledge_base_client['Knowledge_base']
logs_collection = chatbot_db['Chat_Logs']

images_db = chatbot_client['Images']
images_collection = images_db['images_collection']

def store_chat_log(user_id, message, response):
    chat_log = {
        'user_id': user_id,
        'message': message,
        'response': response,
        'timestamp': datetime.datetime.now()
    }
    logs_collection.insert_one(chat_log)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    file = request.files['file']
    user_id = session.get('user_id', 'guest')
    
    if not file:
        return jsonify({"error": "No file provided"}), 400

    # Read the image file
    img = Image.open(file.stream)

    # Example analysis: Get image size
    width, height = img.size

    # Save image to MongoDB
    img_bytes = io.BytesIO()
    img.save(img_bytes, format=img.format)
    img_bytes = img_bytes.getvalue()
    encoded_img = base64.b64encode(img_bytes).decode('utf-8')

    filename = file.filename

    image_data = {
        'filename': filename,
        'image': encoded_img,
        'width': width,
        'height': height,
        'upload_time': datetime.datetime.utcnow()
    }
    result = images_collection.insert_one(image_data)

    # Create a log with the image ID as the message
    image_id = str(result.inserted_id)
    store_chat_log(user_id, f'image_id:{image_id}', 'Image received and stored.')

    # Return the ObjectId of the inserted image
    return jsonify({'message': 'Image uploaded successfully.', 'image_id': image_id})

@app.route('/get_bot_response', methods=['POST'])
def get_bot_response():
    user_message = request.form['user_message']
    user_id = session.get('user_id', 'guest')

    # Check if the message is an image ID
    if user_message.startswith('image_id:'):
        image_id = user_message.split(':')[1]
        response = 'Image received and stored.'
    else:
        # Call OpenAI API to get bot response using v1/chat/completions endpoint
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_message}
            ],
            max_tokens=50
        )['choices'][0]['message']['content'].strip()

    # Store the chat log
    store_chat_log(user_id, user_message, response)

    return jsonify({'bot_response': response})
  

def search_knowledge_base(query):
    # Adjust regex pattern to capture more variations
    regex_pattern = re.compile(r'\b{}\b'.format(re.escape(query)), re.IGNORECASE)
    result = knowledge_base_db['Mechatronics'].find_one({"question": {"$regex": regex_pattern}})
    if result:
        return result['answer']
    else:
        return None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        users = chatbot_db.Passwords
        login_user = users.find_one({'user_id': request.form['user_id']})

        if login_user:
            if login_user['password'] == request.form['password']:
                session['user_id'] = request.form['user_id']
                return redirect(url_for('course'))
            else:
                return 'Invalid username/password combination'
        else:
            return 'User not found'

    return render_template('login.html')

@app.route('/course')
def course():
    if 'user_id' in session:
        users = chatbot_db.Passwords
        user_data = users.find_one({'user_id': session['user_id']})
        courses_collection = chatbot_db.Courses
        courses = list(courses_collection.find())
        
        if user_data:
            return render_template('course.html', user_name=user_data['user_name'], courses=courses)
        else:
            return 'User data not found'
    else:
        return redirect(url_for('login'))


@app.route('/validate_password', methods=['POST'])
def validate_password():
    data = request.get_json()

    user_id = data.get('user_id')
    password = data.get('password')

    users = chatbot_db.Passwords
    login_user = users.find_one({'user_id': user_id})

    if login_user:
        if password == login_user['password']:
            session['user_id'] = user_id
            return jsonify({'status': 'success'})
        else:
            return jsonify({'status': 'error', 'message': 'Password does not match'})
    else:
        return jsonify({'status': 'error', 'message': 'User not found'})

@app.route('/add_user_course', methods=['POST'])
def add_user_course():
    try:
        data = request.json
        user_id = session.get('user_id')
        chosen_course = data.get('chosen_course', 'General')
        login_time = str(datetime.datetime.now())
        rating = None

        if user_id:
            users_collection = chatbot_db.Users
            result = users_collection.insert_one({
                'user_id': user_id,
                'login_time': login_time,
                'chosen_course': chosen_course,
                'rating': rating
            })

            if result.inserted_id:
                return jsonify({'status': 'success', 'message': 'User data added successfully'})
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add user data'})
        else:
            return jsonify({'status': 'error', 'message': 'User ID not found in session'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': 'Server error occurred', 'details': str(e)})



def store_chat_log(user_id, message, response):
    chat_log = {
        'user_id': user_id,
        'message': message,
        'response': response,
        'timestamp': datetime.datetime.now()
    }
    logs_collection.insert_one(chat_log)

if __name__ == '__main__':
    app.run(debug=True)
