from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import hashlib

from pymongo import MongoClient
client = MongoClient('mongodb+srv://please_remember:camp14@cluster0.qstcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.db14





@app.route('/')
def home():
    return render_template('join.html')

@app.route("/join", methods=["POST"])
def join_post():
    uid_receive = request.form['uid_give']
    name_receive = request.form['name_give']
    pwd_receive = request.form['pwd_give']
    hashed_pw = hashlib.sha256(pwd_receive.encode('utf-8')).hexdigest()
    pr_photo_receive = request.form['pr_photo_give']

    doc = {
        'uid': uid_receive,
        'name': name_receive,
        'pwd': hashed_pw,
        'pr_photo': pr_photo_receive
    }

    db.joinusers.insert_one(doc)

    return jsonify({'response':'success', 'msg':'환영합니다!'})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)