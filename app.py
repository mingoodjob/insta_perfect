from flask import Flask, render_template, request, jsonify,redirect,url_for
import os
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

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
    return render_template('profile.html',imglist=imglist, pr_photo=pr_photo)

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

# 시작 페이지 로드
@app.route('/')
def Go_start():
    return render_template('feed.html')  # 작업 편의성을 위해 임시로 피드페이지로 바로 로드

# 피드 페이지 로드
@app.route('/feed')
def Go_feed():
    return render_template('feed.html')

# 프로필 페이지 로드
@app.route('/profile')
def Go_profile():
    return render_template('profile.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)