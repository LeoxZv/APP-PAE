from flask import Flask
from extensions import db, migrate, cors

app = Flask(__name__)

# Initialize extensions with app
db.init_app(app)
migrate.init_app(app, db)
cors.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/users')
def get_users():
    return {'users': ['Alice', 'Bob', 'Charlie']}

if __name__ == '__main__':
    app.run(debug=True, port=8080)
