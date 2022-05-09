from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from pymongo import MongoClient
import os, hashlib
import certifi

client = MongoClient('mongodb+srv://test:sparta@cluster0.avef3.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=certifi.where())
db = client.instaperfect

app = Flask(__name__)

username = 'minkiLee'

@app.route('/')
def home():
  return render_template('feed.html')

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/login_check', methods =['POST'])
def login_check():
    uid = request.form['uid']
    pwd = request.form['pwd']
    if uid == 'test' and pwd == '123456':
        return redirect(url_for('home'))
    else:
        print('아이디/비밀번호가 틀립니다')
        return redirect(url_for('login'))
   
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

    # doc = {
    #     'uid': uid_receive,
    #     'name': name_receive,
    #     'pwd': hashed_pw,
    #     'pr_photo': pr_photo_receive
    # }

    # db.joinusers.insert_one(doc)

    return jsonify({'response':'success', 'msg':'환영합니다!'})  
  
# 프로필 페이지 이동
@app.route('/profile')
def profile():
    name = '이민기'
    write_count = db.feed.count_documents({})
    pr_photo = '../static/img_upload/1.jpg'
    #피드 콜렉션에 모든 내용을 받아온다!
    all_feed = db.feed.find().sort("feed_number", -1)
    # all_feed = db.feed.find()
    # pr_photo = 1
    # print(img_number)
    
    return render_template('profile.html',all_feed=all_feed, pr_photo=pr_photo, write_count=write_count, username=username, name=name)

# 이미지 파일 업로드
@app.route('/upload', methods=['GET', 'POST'])
def get_file():
    if request.method == 'POST':
        path = './static/img_upload/'
        imglist = os.listdir(path)
        img_number = len(imglist) + 1
        image = request.files['file']
        content = request.form['content']
        image.save(f'./static/img_upload/{img_number}.jpg')
        col = db.feed
        number = col.count_documents({})
        
        doc = {
            'feed_number' : number + 1,
            'write_id' : 'dlalsrl',
            'photo' : str(img_number) + '.jpg',
            'content' : content,
            'like_count': 0
        }
        
        db.feed.insert_one(doc)
        
    return redirect(url_for('profile'))

@app.route('/feed_number', methods=['GET', 'POST'])
def feed_number():
    if request.method == 'POST':
        feed_number = request.form['feed_number']
        serch_content = db.feed.find_one({"feed_number": int(feed_number)},{"_id": 0})
        like_count = serch_content['like_count']
        photo = serch_content['photo']
        content = serch_content['content']
        print(photo, content)
        return jsonify({'result': 'success', 'photo': photo, 'content': content, 'username': username, 'like_count' : like_count})
        
if __name__ == '__main__':
   app.run('0.0.0.0', port=80, debug=True)
