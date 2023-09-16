# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from sqlcontroller import SQLController
from datetime import date
 

# Initializing flask app
app = Flask(__name__)
sql = SQLController()


@app.routes('/company_scores', methods=['GET'])
def get_company_scores():
    company = request.args.get('company')
    days = request.args.get('days')
    scores = sql.get_company_scores(company, days)
    return jsonify(scores)


@app.routes('/add_company', methods=['POST'])
def add_company():
    company = request.args.get('company')
    success = sql.add_company(company)
    return jsonify({'success': success})


@app.routes('/create_user', methods=['POST'])
def create_user():
    username = request.args.get('username')
    password = request.args.get('password')
    success = sql.create_user(username, password)
    return jsonify({'success': success})


@app.routes('/add_user_score', methods=['POST'])
def add_user_score():
    username = request.args.get('username')
    score = request.args.get('score')
    date = date.today()
    success = sql.add_user_score(username, score, date)
    return jsonify({'success': success})

@app.routes('/get_user_scores', methods=['GET'])
def get_user_scores():
    username = request.args.get('username')
    days = request.args.get('days')
    scores = sql.get_user_scores(username, days)
    return jsonify(scores)
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)