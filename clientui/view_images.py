from pymongo import MongoClient
import base64
from PIL import Image
import io

# Connect to MongoDB
client = MongoClient('mongodb://125.22.54.196:5000/')
images_db = client['Images']
images_collection = images_db['images_collection']

def choose_and_view_image(filename):
    # Find the image document by filename
    image_doc = images_collection.find_one({'filename': filename})

    if image_doc:
        encoded_img = image_doc['image']
        
        # Decode the base64 encoded image data
        img_bytes = base64.b64decode(encoded_img)
        
        # Display the image
        img = Image.open(io.BytesIO(img_bytes))
        img.show()  # This will open the image in the default image viewer
    else:
        print(f"Image with filename '{filename}' not found.")

if __name__ == '__main__':
    filename_to_view = 'logo.png'  # Replace with the filename of the image you want to view
    choose_and_view_image(filename_to_view)
