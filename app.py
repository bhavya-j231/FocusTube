from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-notes', methods=['POST'])
def generate_notes():
    data = request.json
    transcript = data.get('transcript', '')
    
    prompt = f"Summarize the following video content into bullet points for quick understanding:\n\n{transcript}"
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    
    notes = response['choices'][0]['message']['content']
    return jsonify({'notes': notes})

if __name__ == "__main__":
    app.run(debug=True)

