import sqlite3


class SQLController:
    def __init__(self):
        self.connection = sqlite3.connect('dungeon.db')
        self.cursor = self.connection.cursor()

    # Get the x days of scores of a company
    def get_company_scores(self, company, days):
        company_table = company + '_company_scores'
        self.cursor.execute(
            f"SELECT score FROM {company_table} ORDER BY date DESC LIMIT {days}")
        return self.cursor.fetchall()

    # Add company to database
    def add_company(self, company):
        self.cursor.execute("SELECT * FROM companies WHERE name=?", (company))
        if self.cursor.fetchone() is None:
            self.cursor.execute(
                f"CREATE TABLE IF NOT EXISTS {company}_company_scores (date TEXT, score INTEGER)")
            self.cursor.execute(
                f"INSERT INTO companies VALUES ('{company}')")
            self.connection.commit()
            return True
        else:
            return False

    # Create user
    def create_user(self, username, password, company):
        self.cursor.execute("SELECT * FROM users WHERE username=?", (username))
        if self.cursor.fetchone() is None:
            # Add user to user table
            self.cursor.execute(
                "INSERT INTO users VALUES (?, ?, ?)", (username, password, company))
            # Create user score table
            self.cursor.execute(
                f"CREATE TABLE IF NOT EXISTS {username}_user_scores (date TEXT, score INTEGER)")
            self.connection.commit()
            return True
        else:
            return False
        
    # Add user score
    def add_user_score(self, username, score, date):
        self.cursor.execute(
            f"SELECT * FROM {username}_user_scores WHERE date=?", (date))
        # If there is no score for that date, add it
        if self.cursor.fetchone() is None:
            self.cursor.execute(
                f"INSERT INTO {username}_user_scores VALUES (?, ?)", (date, score))
            self.connection.commit()
            return True
        else:
            return False
        
        