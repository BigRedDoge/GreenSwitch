# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from sqlcontroller import SQLController
from datetime import date
from flask.ext.login import LoginManager, UserMixin, login_required, login_user, logout_user
from user import User

# Initializing flask app
app = Flask(__name__)

uri = "sqlite:///dungeon.db"
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

login_manager = LoginManager()
login_manager.init_app(app)

sql = SQLController()

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    user = sql.get_user(username)
    if user is not None and user.password == password:
        login_user(User(username, password))
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

# Get the x days of scores of a company
@app.routes('/company_scores', methods=['GET'])
def get_company_scores():
    company = request.args.get('company')
    days = request.args.get('days')
    scores = sql.get_company_scores(company, days)
    return jsonify(scores)

# Add company to database
@app.routes('/add_company', methods=['POST'])
def add_company():
    company = request.args.get('company')
    success = sql.add_company(company)
    return jsonify({'success': success})

# Create user
@app.routes('/create_user', methods=['POST'])
def create_user():
    username = request.args.get('username')
    password = request.args.get('password')
    success = sql.create_user(username, password)
    return jsonify({'success': success})

# Add user score for today
@app.routes('/add_user_score', methods=['POST'])
def add_user_score():
    username = request.args.get('username')
    score = request.args.get('score')
    date = date.today()
    success = sql.add_user_score(username, score, date)
    return jsonify({'success': success})

# Get the x days of scores of a user
@app.routes('/get_user_scores', methods=['GET'])
def get_user_scores():
    username = request.args.get('username')
    days = request.args.get('days')
    scores = sql.get_user_scores(username, days)
    return jsonify(scores)

# Get the leaderboard over the last x days for y users
@app.routes('/get_company_leaderboard', methods=['GET'])
def get_company_leaderboard():
    company = request.args.get('company')
    days = request.args.get('days')
    num_users = request.args.get('num_users')
    leaderboard = sql.get_company_leaderboard(company, days, num_users)
    return jsonify(leaderboard)

# route for answers to questions -> calculate score and enter into db
# delete route for adding user score
# algorithm for calculating score
# user login/logout
# number of responses for questions
# question table
# user streaks - variable based on company
# users to be marked as admin


# Running app
if __name__ == '__main__':
    app.run(debug=True)