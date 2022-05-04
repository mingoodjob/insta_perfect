from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# 파일 저장
@app.route('/api', methods=['POST'])
def get_file():
    image = request.file['image']
    print(f'{image}')
#   image.save(f'./{image.filename}')
    return render_template('profile.html')

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