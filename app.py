from flask import Flask, render_template

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.codeggumst


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