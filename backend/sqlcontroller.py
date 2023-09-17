import sqlite3
from datetime import datetime
import json


class SQLController:
    def __init__(self):
        self.connection = sqlite3.connect('dungeon.db', check_same_thread=False)
        self.cursor = self.connection.cursor()

    # Get the x days of scores of a company
    # returns dict of structure {day: {q1: value, q2: value, q3: value}}}
    def get_company_scores(self, company, days):
        cursor = self.connection.cursor()
        company_table = company + '_company_scores'
        cursor.execute(
            f"SELECT question1, question2, question3 FROM {company_table} ORDER BY date DESC LIMIT {days}")
        results = cursor.fetchall()
        scores = {}
        for result in results:
            scores.append(result[0] + result[1] + result[2])
        return scores
        return cursor.fetchall()
    
    # Get the leaderboard over the last x days
    # TODO: BROKEN
    def get_company_leaderboard(self, company, days, num_users):
        cursor = self.connection.cursor()
        users = cursor.execute(
            f"SELECT username FROM users WHERE company=?", (company,))
        leaderboard = []
        # Get the score of each user
        for user in users:
            username = user[0]
            score = cursor.execute(
                f"SELECT score FROM {username}_user_scores ORDER BY date DESC LIMIT {days}")
            leaderboard.append({"username": username,
                                "score": score})
        sorted(leaderboard, key=lambda k: k['score'])
        return leaderboard[:num_users]

    # Add company to database
    def add_company(self, company):
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM companies WHERE name=?", (company,))
            if cursor.fetchone() is None:
                cursor.execute(
                    f"CREATE TABLE IF NOT EXISTS {company}_company_scores (date TEXT, question1 INTEGER, question2 INTEGER, question3 INTEGER)")
                cursor.execute(
                    f"INSERT INTO companies VALUES ('{company}')")
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("add_company Exception", e)
            return False

    # Create user
    def create_user(self, username, password, company):
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username=?", (username,))
            if cursor.fetchone() is None:
                # Add user to user table
                cursor = self.connection.cursor()
                cursor.execute(
                    "INSERT INTO users VALUES (?, ?, ?)", (username, password, company,))
                # Create user score table
                cursor = self.connection.cursor()
                cursor.execute(
                    f"CREATE TABLE IF NOT EXISTS {username}_user_scores (date TEXT, question1 INTEGER, question2 INTEGER, question3 INTEGER)")
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("create_user Exception", e)
            return False

    # Add user score
    def add_user_score(self, username, id, score, date):
        try:
            cursor = self.connection.cursor()
            cursor.execute(
                f"SELECT * FROM {username}_user_scores WHERE date=?", (date,))
            # If there is no score for that date, add it
            if cursor.fetchone() is None:
                # Update user score
                cursor.execute(
                    f"INSERT INTO {username}_user_scores (date, question{id}) VALUES (?) WHERE ", (date, score,))
                
                # Update company score
                cursor.execute(
                    f"SELECT company FROM users WHERE username=?", (username,))
                company = self.cursor.fetchone()[0]
                
                cursor.execute(
                    f"SELECT * FROM {company}_company_scores WHERE date=?", (date,))
                if cursor.fetchone() is None:
                    cursor.execute(
                        f"INSERT INTO {company}_company_scores (date, question{id}) VALUES (?) WHERE ", (date, score,))
                else:
                    cursor.execute(
                        f"UPDATE {company}_company_scores SET question{id}=question{id}+? WHERE date=?", (score, date,))
                self.connection.commit()
                return True
            else:
                # Update user score for question id
                cursor.execute(
                    f"UPDATE {username}_user_scores SET question{id}=score? WHERE date=?", (score, date,))
                # Update company score for question id
                cursor.execute(
                        f"UPDATE {company}_company_scores SET question{id}=question{id}+? WHERE date=?", (score, date,))
                self.connection.commit()
                return False
        except Exception as e:
            print("add_user_score Exception", e)
            return False    

    # Get the x days of scores of a user
    # TODO: BROKEN
    def get_user_scores(self, username, days):
        self.cursor.execute(
            f"SELECT score FROM {username}_user_scores ORDER BY date DESC LIMIT {days}")
        return self.cursor.fetchall()
    

    # Get the password of a user
    def get_user(self, username):
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT password FROM users WHERE username=?", (username,))
            password = cursor.fetchone()
            if password is not None:
                return cursor.fetchone()[0]
            return None
        except Exception as e:
            print("get_user Exception", e)
            return None
    
    # Get latest questions 
    def get_questions(self, num_questions):
        # cursor = self.connection.cursor()
        # cursor.execute(f"SELECT * FROM questions ORDER BY last_accessed DESC LIMIT {num_questions}")
        # questions = cursor.fetchall()
        # for question in questions:
        #     cursor.execute("UPDATE questions set last_accessed = ? WHERE id = ?", (datetime.now(), question[0]))
        # self.connection.commit()
        # questions = [question[1] for question in questions]
        # subtitles = [json.loads(question[2]) for question in questions]
        
        cursor = self.connection.cursor()
        cursor.execute(f"SELECT * FROM questions ORDER BY last_accessed DESC LIMIT {num_questions}")
        qs_and_subs = cursor.fetchall()
        
        for question in qs_and_subs:
            cursor.execute("UPDATE questions set last_accessed = ? WHERE id = ?", (datetime.now(), question[0]))
        self.connection.commit()

        questions = [question[1] for question in qs_and_subs]
        subtitles = [json.loads(subs[2]) for subs in qs_and_subs]
        return questions, subtitles
        

