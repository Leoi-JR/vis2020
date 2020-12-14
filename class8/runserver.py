
from flask import Flask, render_template, request, url_for
import connect
import base64

app = Flask(__name__)
TEMPLATES_AUTO_RELOAD = True
SEND_FILE_MAX_AGE_DEFAULT = 0

mongo = connect.Mongo()
db = mongo.connect()
mycol = db["user"]


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('file.html')


@app.route('/upload', methods=['POST'])
def upload():
    # upload_file = request.files.get('file')
    # print(upload_file)

    other = request.form["name"]
    print(other)

    mydict = {"id": request.form["id"], "name": request.form["name"],
              "balance": request.form["balance"]}#, "photo": request.form["show"]
    mycol.insert_one(mydict)

    for x in mycol.find():
        print(x)

    return "sucessful"


@app.route('/show', methods=['GET'])
def show():
    return render_template('data.html', mycol=mycol)


if __name__ == '__main__':
    app.run(debug=True)
