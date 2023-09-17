from sqlcontroller import SQLController
import json
from datetime import datetime

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
