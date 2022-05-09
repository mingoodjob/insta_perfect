from flask import Flask, render_template, request, redirect, url_for, jsonify
import os, hashlib

client = MongoClient('mongodb+srv://test:sparta@cluster0.avef3.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.instaperfect

app = Flask(__name__)


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

    db.users.insert_one(doc)

    return jsonify({'response': 'success', 'msg': '환영합니다!'})


## URL 별로 함수명이 같거나,
## route('/') 등의 주소가 같으면 안됩니다.

loginCheck = False


@app.route('/')
def home():
    if loginCheck == True:
        return render_template('feed.html')
    else:
        return render_template('login.html')


@app.route('/login')
def feed():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    uid = request.form['uid']
    pwd = request.form['pwd']
    if uid == 'test' and pwd == '123456':
        loginCheck = True
        return redirect(url_for('feed'))

else:
print('아이디/비밀번호가 틀립니다')
return redirect(url_for('home'))


@app.route('/profile')
def profile():
    # import os
    # 파일 위치를 path 변수에 저장함
    path = './static/img_upload/'
    # imglist 변수에 path변수 위치에 있는 파일들을 리스트로 가져옴
    imglist = os.listdir(path)
    imglist.reverse()
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