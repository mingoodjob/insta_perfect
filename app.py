from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

## URL 별로 함수명이 같거나,
## route('/') 등의 주소가 같으면 안됩니다.

@app.route('/')
def home():
   return render_template('login.html')


@app.route('/main')
def main():
    return render_template('index.html')


@app.route('/login', methods =['POST'])
def login():

    id_ = request.form['id_']
    pw_ = request.form['pw_']
    if id_ == 'test' and pw_ == '123456':
        return redirect(url_for('main'))
    else:
        print('아이디/비밀번호가 틀립니다')
        return redirect(url_for('home'))



if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
