# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from sqlcontroller import SQLController
from datetime import date
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from user import User

# Initializing flask app
app = Flask(__name__)
app.secret_key = "super secret key"

login_manager = LoginManager()
login_manager.init_app(app)

sql = SQLController()

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    # password from db if username exists
    pw = sql.get_user(username)
    if username is not None and pw and password == pw:
        login_user(User(username, password))
        user = current_user
        print(user.username)
        return jsonify({'success': True})
    else:
        print("Not logged in")
        return jsonify({'success': False})

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True})

# Get the x days of scores of a company
@app.route('/company_scores', methods=['GET'])
def get_company_scores():
    company = request.json.get('company')
    days = request.json.get('days')
    scores = sql.get_company_scores(company, days)
    return jsonify(scores)

# Add company to database
@app.route('/add_company', methods=['POST'])
def add_company():
    company = request.json.get('company')
    success = sql.add_company(company)
    return jsonify({'success': success})

# Create user
@app.route('/create_user', methods=['POST'])
def create_user():
    username = request.json.get('username')
    password = request.json.get('password')
    company = request.json.get('company')
    success = sql.create_user(username, password, company)
    print(success)
    return jsonify({'success': success})

# Add user score for today
@app.route('/add_user_score', methods=['POST'])
def add_user_score():
    username = request.json.get('username')
    score = request.json.get('score')
    dt = date.today()
    success = sql.add_user_score(username, score, dt)
    return jsonify({'success': success})

# Get the x days of scores of a user
@app.route('/get_user_scores', methods=['GET'])
def get_user_scores():
    username = request.json.get('username')
    days = request.json.get('days')
    scores = sql.get_user_scores(username, days)
    return jsonify(scores)

# Get the leaderboard over the last x days for y users
@app.route('/get_company_leaderboard', methods=['GET'])
def get_company_leaderboard():
    company = request.json.get('company')
    days = request.json.get('days')
    num_users = request.json.get('num_users')
    leaderboard = sql.get_company_leaderboard(company, days, num_users)
    return jsonify(leaderboard)

@app.route('/get_questions', methods=['GET'])
def get_questions():
    q_count = 3
    questions, subtitles = sql.get_questions(q_count)
    response = []
    for i in range(len(questions)):
        response.append({'id': i, 'question': questions[i], 'subtitles': subtitles[i]})
    return jsonify(response)

# Submit score for question
@app.route('/submit_score', methods=['POST'])
def submit_score():
    username = current_user.username
    score = request.json.get('score')
    id = request.json.get('id')
    dt = date.today()
    success = sql.add_user_score(username, id, score, dt)
    print("success: ", success)
    return jsonify({'success': success})

# Get company leaderboard
@app.route('/get_companies_scores', methods=['GET'])
def get_companies_scores():
    scores = sql.get_company_scores()
    print(scores)
    return jsonify(scores)

# Get company leaderboard
@app.route('/get_company_leaderboard', methods=['GET'])
def get_company_leaderboard():
    company = sql.get_company(current_user.company)
    leaderboard = sql.get_company_leaderboard(company)
    return jsonify(leaderboard)

@login_manager.user_loader
def load_user(user_id):
    return User(user_id, sql.get_user(user_id))

# route for answers to questions -> calculate score and enter into db
# number of responses for questions
# question table
# user streaks - variable based on company
# users to be marked as admin
# users each question score tracked
# questions cycle

# Have you recycled in the past day/week? - ["Not at all", "Rarely", "Sometimes", "Often", "Very Often"]
# How likely are you to participate in Riverfront Recapture? - ["Not at all", "Rarely", "Sometimes", "Often", "Very Often"]
# How did you commute to work? - ["Car", "Carpool", "Bus", "Train/Rail", "Walking/Cycling"] 
# 


# Running app
if __name__ == '__main__':
    app.run(debug=True)