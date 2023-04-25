from flask import Flask, send_from_directory
from flask_cors import CORS,cross_origin


app = Flask(__name__,static_folder='./build',static_url_path="")
CORS(app)

@app.route('/profile')
@cross_origin()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder,'index.html')

if __name__ == '__main__':
    app.debug = True
    app.run()