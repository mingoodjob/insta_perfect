from flask import Flask, render_template, request, redirect, url_for, jsonify
from pymongo import MongoClient
import certifi
client = MongoClient('mongodb+srv://test:sparta@cluster0.avef3.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=certifi.where())
db = client.instaperfect
import os, hashlib, jwt, datetime
SECRET_KEY = 'insta'

app = Flask(__name__)

@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"uid": payload['uid']})
        print(user_info['uid'])
        print(user_info['name'])
        return render_template('feed.html')

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login"))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login"))

@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)

@app.route("/join_page")
def join_page():
    return render_template('join.html')


@app.route("/join", methods=["POST"])
def join_post():
    uid_receive = request.form['uid_give']
    name_receive = request.form['name_give']
    pwd_receive = request.form['pwd_give']
    hashed_pw = hashlib.sha256(pwd_receive.encode('utf-8')).hexdigest()
    pr_photo_receive = request.form['pr_photo_give']

    print(uid_receive)
    print(name_receive)
    print(hashed_pw)
    print(pr_photo_receive)

    doc = {
        'uid': uid_receive,
        'name': name_receive,
        'pwd': hashed_pw,
        'pr_photo': pr_photo_receive
    }

    db.user.insert_one(doc)

    return jsonify({'response': 'success', 'msg': '환영합니다!'})

@app.route('/login_check', methods=['POST'])
def login_check():
    uid_receive = request.form['uid_give']
    pwd_receive = request.form['pwd_give']

    pwd_hash = hashlib.sha256(pwd_receive.encode('utf-8')).hexdigest()
    result = db.user.find_one({
        'uid': uid_receive,
        'pwd': pwd_hash
    })

    if result is not None:
        payload = {
            'uid': uid_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        print("token =", end=""), print(token)
        return jsonify({'result': 'success', 'token': token})

    else:
        return jsonify({'result': 'fail', 'msg': 'wrong'})


@app.route('/login/name', methods=['GET'])
def login_name():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        # print(payload)
        userinfo = db.user.find_one({'uid': payload['uid']})
        return jsonify({'result': 'success', 'name': userinfo['name']})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


# 프로필 페이지 이동
@app.route('/profile')
def profile():
    # import os
    # 파일 위치를 path 변수에 저장함
    path = './static/img_upload/'
    # imglist 변수에 path변수 위치에 있는 파일들을 리스트로 가져옴
    imglist = os.listdir(path)
    # imglist.reverse()
    pr_photo = imglist[0]
    # print(img_number)
    return render_template('profile.html', imglist=imglist, pr_photo=pr_photo)


# 이미지 파일 업로드
@app.route('/upload', methods=['GET', 'POST'])
def get_file():
    if request.method == 'POST':
        path = './static/img_upload/'
        imglist = os.listdir(path)
        img_number = len(imglist) + 1
        image = request.files['file']
        content = request.form['content']
        print(content)
        image.save(f'./static/img_upload/{img_number}.jpg')
    return redirect(url_for('profile'))


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)