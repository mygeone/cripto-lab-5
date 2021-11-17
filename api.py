from flask_pymongo import PyMongo
import flask
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True

#mongodb
mongodb_client = PyMongo(app, uri="mongodb://http://127.0.0.1:27017//data")
db = mongodb_client.db


class User(db.Document):
    name = db.StringField()
    email = db.StringField()


@app.route('/postData', methods=['POST'])
def postData():
    body = request.data
    #parseData
    db.data.insertMany({
        "IP": '192.1.0.0',
        "SO": 'Windows SO',
        "Pass File": 'sadj@dasf'
    })

@app.route('/getData', methods=['POST'])
def getData():
    collection = db.data
    return jsonify(user.to_json())

app.run()
