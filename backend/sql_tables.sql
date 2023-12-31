companies
company

CREATE TABLE companies(
    ID INT PRIMARY KEY NOT NULL,
    company TEXT NOT NULL
)


company point score 
day | total score

CREATE TABLE IF NOT EXISTS x_company_scores(
    ID INT PRIMARY KEY NOT NULL,
    date TEXT NOT NULL,
    score REAL DEFAULT 0
)


users
username | password | company

CREATE TABLE users (
    ID INT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    company INT NOT NULL,
    FOREIGN KEY (company) REFERENCES companies(ID)
)


user 
day | score

CREATE TABLE IF NOT EXISTS x_user_scores(
    ID INT PRIMARY KEY NOT NULL,
    date TEXT NOT NULL,
    score REAL DEFAULT 0
)
