from flask import Flask, render_template, request, jsonify
from utils import process_script_request
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, 
            static_url_path='', 
            static_folder='.',
            template_folder='.')

API_URL = os.getenv('API_URL', 'http://localhost:5000') 

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/generate-script', methods=['POST'])
def generate_script():
    # Get form data
    video_type = request.form.get('video_type')
    video_topic = request.form.get('video_topic')
    target_audience = request.form.get('target_audience')
    key_messages = request.form.get('key_messages')
    video_duration = request.form.get('video_duration')
    video_tone = request.form.get('video_tone')
    visual_themes = request.form.get('visual_themes')
    
    # Process the script request with all parameters
    response = process_script_request(
        video_type=video_type, 
        video_topic=video_topic,
        target_audience=target_audience,
        key_messages=key_messages,
        video_duration=video_duration,
        video_tone=video_tone,
        visual_themes=visual_themes
    )
    
    return jsonify({"script": response})

if __name__ == '__main__':
    app.run(debug=True)