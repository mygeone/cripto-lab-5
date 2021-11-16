import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/apiv1', methods=['POST'])
def apiv1():
    body = request.data
    print(body)
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

app.run()