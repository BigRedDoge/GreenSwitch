import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';

const SurveyScreen = ({ navigation }) => {



    const likerts = [
        {
            question: "How would you rate the design of this app?",
            subtitles: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        },
        {
            question: "How satisfied are you with the performance?",
            subtitles: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        },
        {
            question: "Did you find the user interface intuitive?",
            subtitles: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        }
    ];

    // const [questions, setQuestions] = useState([]);
    // Create an array of null values for the initial ratings
    const [ratings, setRatings] = useState(new Array(likerts.length).fill(null));
    // If every rating satisfies condiition, true
    let allQuestionsAnswered = ratings.every(rating => rating !== null);

    const handleRatingUpdate = (index, value) => {
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    };

    const handleFinish = () => {
        // Check if all questions have been answered (no null values in ratings array)
        if (allQuestionsAnswered) {
            // Write results to the database

            // Navigate to 'Result' screen
            navigation.navigate('Result');
        } else {
            // Display an error message or take appropriate action
            console.error("Please answer all questions before continuing.");
        }
    };

    return (
        <View>
            <Text>Survey Screen</Text>
            {likerts.map((likert, index) => (
                <LikertScaleQuestion 
                    key={index}
                    question={likert.question}
                    optionSubtitles={likert.subtitles}
                    onAnswerChange={(value) => handleRatingUpdate(index, value)}
                />
            ))}
            <Button 
            title='Continue'
            onPress={handleFinish}
            disabled={!allQuestionsAnswered}/>
        </View>
    );
};
export default SurveyScreen;