from flask import Flask, render_template, request, redirect, url_for, jsonify
from pymongo import MongoClient
import os, hashlib,certifi,datetime,jwt

client = MongoClient('mongodb+srv://test:sparta@cluster0.avef3.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=certifi.where())
db = client.instaperfect

app = Flask(__name__)

SECRET_KEY = 'insta'

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

@app.route('/<uid>', methods=['GET'])
def profiles(uid):
    payload = jwt.decode(request.cookies.get('mytoken'), SECRET_KEY, algorithms=['HS256'])
    userid = payload['uid']
    all_feed = db.feed.find({'write_id' : uid}).sort("feed_number", -1)
    write_count = db.feed.count_documents({'write_id': uid})
    return render_template('profile.html',all_feed=all_feed, username=uid, write_count=write_count, userid=userid)

# 유저 정보 불러오기
@app.route('/user', methods=['GET'])
def find_userdb():
    user = db.user.find_one({'uid': 'jaewan_choi'}, {'_id': False})
    return jsonify({'response': 'success', 'user': user})


# feed 정보 불러오기
@app.route('/feed', methods=['GET'])
def find_feed():
    content = list(db.feed.find({'write_id': 'jaewan_choi'}, {'_id': False}))
    user = db.user.find_one({'uid': 'jaewan_choi'}, {'_id': False})
    pr_photo = user['pr_photo']
    return jsonify({'response': 'success', 'content': content, 'pr_photo': pr_photo})


@app.route('/login')
def login():
    return render_template('login.html')


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
    payload = jwt.decode(request.cookies.get('mytoken'), SECRET_KEY, algorithms=['HS256'])
    uid_get = db.user.find_one({'uid': payload['uid']})
    uid = uid_get['uid']
    name = uid_get['name']
    write_count = db.feed.count_documents({'write_id': uid})
    pr_photo = uid_get['pr_photo']
    print(pr_photo)
    #피드 콜렉션에 모든 내용을 받아온다! #feed number로 내림차순 정렬
    all_feed = db.feed.find({'write_id' : uid}).sort("feed_number", -1)
    return render_template('profile.html',all_feed=all_feed, pr_photo=pr_photo, write_count=write_count, username=uid, name=name)



# 이미지 파일 업로드
@app.route('/upload', methods=['GET', 'POST'])
def get_file():
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    if request.method == 'POST':
        image = request.files['file']
        content = request.form['content']
        uid_get = db.user.find_one({'uid': payload['uid']})
        uid = uid_get['uid']
        col = db.feed
        number = col.count_documents({})
        image.save(f'./static/img_upload/{number}.jpg')
        
        doc = {
            'feed_number' : number + 1,
            'write_id' : uid,
            'photo' : str(number) + '.jpg',
            'content' : content,
            'like_count': 0
        }
        
        db.feed.insert_one(doc)
        
    return redirect(url_for('profile'))

@app.route('/feed_number', methods=['GET', 'POST'])
def feed_number():
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    if request.method == 'POST':
        feed_number = request.form['feed_number']
        uid_get = db.user.find_one({'uid': payload['uid']})
        uid = uid_get['uid']
        serch_content = db.feed.find_one({"feed_number": int(feed_number)},{"_id": 0})
        write_id = serch_content['write_id']
        like_count = serch_content['like_count']
        photo = serch_content['photo']
        content = serch_content['content']
        print(photo, content)
        return jsonify({'result': 'success', 'photo': photo, 'content': content, 'username': uid, 'like_count' : like_count, 'write_id': write_id})
        
if __name__ == '__main__':

  app.run('0.0.0.0', port=80, debug=True)
