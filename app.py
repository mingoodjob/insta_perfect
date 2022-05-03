from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/api', methods=['POST'])
def get_file():
    image = request.file['image']
    print(f'{image}')
#   image.save(f'./{image.filename}')
    return render_template('profile.html')

if __name__ == '__main__':  
    app.run('0.0.0.0',port=5000,debug=True)

