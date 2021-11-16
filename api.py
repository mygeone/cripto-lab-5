import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/apiv1', methods=['POST'])
def apiv1():
    body = request.data
    print(body)
app.run()
