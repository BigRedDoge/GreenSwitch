from sqlcontroller import SQLController
import json
from datetime import datetime
from datetime import date
import random

sql = SQLController()

def add_question(question, subtitles):
    subs = json.dumps(subtitles)

    cursor = sql.connection.cursor()
    cursor.execute(
        f"INSERT INTO questions (question, subtitles, last_accessed) VALUES (?, ?, ?)", (question, subs, datetime.now()))
    sql.connection.commit()

def get_questions():
    cursor = sql.connection.cursor()
    cursor.execute("SELECT * FROM questions ORDER BY last_accessed")
    qs_and_subs = cursor.fetchall()
    
    for question in qs_and_subs:
        cursor.execute("UPDATE questions set last_accessed = ? WHERE id = ?", (datetime.now(), question[0]))
    sql.connection.commit()

    questions = [question[1] for question in qs_and_subs]
    subtitles = [json.loads(subs[2]) for subs in qs_and_subs]
    return questions, subtitles


if __name__ == '__main__':
    #add_question("Have you recycled in the past day/week?", ["Not at all", "Rarely", "Sometimes", "Often", "Very Often"])
    # add_question("How did you commute to work this week?", ["Car", "Carpool", "Bus", "Train/Rail", "Walking/Cycling"])
    # add_question("How likely are you to participate in Riverfront Recapture?", ["Not at all", "Rarely", "Sometimes", "Often", "Very Often"])
    # add_question("How frequently did you use reusable shopping bags this week?", ["Not at all", "Rarely", "Sometimes", "Often", "Very Often"])
    # add_question("I reduced my electricity usage this week by turning off lights and appliances when not in use.", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"])
    # add_question("I sorted my waste into recyclables and non-recyclables this week.", ["Didn't Do It", "Thought About It", "Sometimes", "Made an Active Effort", "Did It Every Time"])
    # add_question("I brought my own reusable water bottle or coffee cup this week instead of using disposable ones.", ["Not at All", "Thought About It", "Sometimes", "Most Days", "Every Day"])
    # add_question("I made an effort to buy products with eco-friendly packaging or those made from recycled materials this week.", ["Not at All", "Slightly", "Somewhat", "Moderately", "Extensively"])
    # add_question("I reduced my water consumption this week by taking shorter showers and turning off the tap when not needed.", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"])
    # add_question("I took steps to educate myself or others about sustainability-related topics this week.", ["Not at All", "Slightly", "Somewhat", "Moderately", "Extensively"])
    # add_question("I turned off my computer, TV, and other electronic devices when not in use this week.", ["Didn't Do It", "Thought About It", "Sometimes", "Made an Active Effort", "Did It Every Time"])
    # add_question("I actively sought out and used products with eco-certifications or sustainability labels when shopping this week.", ["Never", "Rarely", "Sometimes", "Often", "Always"])
    # add_question("I minimized food packaging waste by buying in bulk or choosing products with minimal packaging this week.", ["Never", "Rarely", "Sometimes", "Often", "Always"])
    # add_question("I actively supported or volunteered with an environmental organization this week.", ["Never", "Rarely", "Sometimes", "Often", "Always"])
    # print(get_questions())

    sql.create_user("A", "A", "A", 1) 
    sql.add_company("A")

    companies = ["Sustainable Living Co.", 'EcoTech Solutions', "Nature's Beauty Products", 'Clean Energy Enterprises', 'EnviroBuilders']
    dummies = [
        ['AliceSmith', 'P@ssw0rd1', 'Sustainable Living Co.'],
        ['BobJohnson', 'SecurePass12', 'EcoTech Solutions'],
        ['CatherineBrown', 'Secret12345', "Nature's Beauty Products"],
        ['DavidWilson', 'Pa$$w0rd!', 'Clean Energy Enterprises'],
        ['EleanorDavis', 'StrongPwd2023', 'EnviroBuilders'],
        ['FrankMiller', 'SafePass987', 'Sustainable Living Co.'],
        ['GraceTaylor', '1234Password', 'EcoTech Solutions'],
        ['HenryLee', 'P@ss1234', "Nature's Beauty Products"],
        ['IsabelGarcia', 'SecurityP@ss', 'Clean Energy Enterprises'],
        ['JackAnderson', 'P@ssword567', 'EnviroBuilders'],
        ['KatherineWhite', 'SuperSafePwd', 'Sustainable Living Co.'],
        ['LiamHarris', 'Pa$$w0rd2023', 'EcoTech Solutions'],
        ['MiaClark', 'SecretPwd789', "Nature's Beauty Products"],
        ['NathanTurner', '12345Secure', 'Clean Energy Enterprises'],
        ['OliviaAllen', 'StrongP@ss1', 'EnviroBuilders'],
        ['PatrickScott', 'SafePwd12', 'Sustainable Living Co.'],
        ['QuinnLewis', 'Pa$$w0rd!', 'EcoTech Solutions'],
        ['RachelMartin', 'SuperPass2023', "Nature's Beauty Products"],
        ['SamuelHall', 'Password123!', 'Clean Energy Enterprises'],
        ['TaylorAdams', 'SecureP@ssword', 'EnviroBuilders'],
        ['UrsulaRodriguez', 'SafePwd1234', 'Sustainable Living Co.'],
        ['VictorGreen', 'P@ssword456', 'EcoTech Solutions'],
        ['WendyBaker', '1234SecurePwd', "Nature's Beauty Products"],
        ['XavierLopez', 'StrongPass!', 'Clean Energy Enterprises'],
        ['YasmineSmith', 'Pa$$word5678', 'EnviroBuilders'],
        ['ZacharyTurner', 'SecurePwd2022', 'Sustainable Living Co.'],
        ['AvaWilliams', 'StrongSecure1', 'EcoTech Solutions'],
        ['BenjaminDavis', 'P@ssword1234', "Nature's Beauty Products"],
        ['CharlotteMartinez', 'SafeP@ss12', 'Clean Energy Enterprises'],
        ['DanielHarris', 'Secure12345', 'EnviroBuilders'],
        ['EmilyJohnson', 'Pa$$w0rd2021', 'Sustainable Living Co.'],
        ['FinnAnderson', 'SecretPassword', 'EcoTech Solutions'],
        ['GraceLee', 'SecurePwd!', "Nature's Beauty Products"],
        ['HenryJackson', 'StrongPass2022', 'Clean Energy Enterprises'],
        ['IsabellaTaylor', 'P@ssword123!', 'EnviroBuilders'],
        ['JacobBrown', 'SafeP@ss1234', 'Sustainable Living Co.'],
        ['KatherineGarcia', 'SuperP@ssword', 'EcoTech Solutions'],
        ['LiamMoore', '12345SecurePwd', "Nature's Beauty Products"],
        ['MiaClark', 'StrongPass!', 'Clean Energy Enterprises'],
        ['NathanTurner', 'P@ssword456', 'EnviroBuilders'],
        ['OliviaAdams', 'SecurePwd2021', 'Sustainable Living Co.'],
        ['PatrickMartin', 'StrongSecure1', 'EcoTech Solutions'],
        ['QuinnHall', 'P@ssword1234', "Nature's Beauty Products"],
        ['RachelScott', 'SafeP@ss12', 'Clean Energy Enterprises'],
        ['SamuelWhite', 'Secure12345', 'EnviroBuilders'],
        ['TaylorBaker', 'Pa$$word2022', 'Sustainable Living Co.'],
        ['UrsulaAllen', 'SecretPassword', 'EcoTech Solutions'],
        ['VictorTurner', 'SecurePwd!', "Nature's Beauty Products"],
        ['WendyLewis', 'StrongPass2022', 'Clean Energy Enterprises'],
        ['XavierRodriguez', 'Pa$$word123!', 'EnviroBuilders']
    ]

    for company in companies:
        sql.add_company(company)

    for dummy in dummies:
        sql.create_user(dummy[0], dummy[1], dummy[2], 1)
        dayweeks = [7, 14, 21, 28]
        for i in range(20):
            month = i % 5 + 1
            day = dayweeks[i % 4]
            year = 2023
            fake_date = date(year, month, day)
            for id in range(3):
                sql.add_user_score(dummy[0], id, random.randint(1, 5), fake_date, dummy[2])
                print(dummy[0], id, random.randint(1, 5), fake_date, dummy[2])

    #print(sql.get_company_scores())
    #print(sql.get_company_leaderboard("EnviroBuilders"))
    print(sql.get_user_scores("EleanorDavis"))

