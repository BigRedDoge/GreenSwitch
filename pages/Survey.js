import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';

const SurveyScreen = ({ navigation }) => {

    const questions = [
        "How would you rate the design of this app?",
        "How satisfied are you with the performance?",
        "Did you find the user interface intuitive?"
    ];

    const [selectedRatings, setRatings] = useState(Array(questions.length).fill(null));

    const handleRatingChange = (index, value) => {
      const newRatings = [...selectedRatings];
      newRatings[index] = value;
      setRatings(newRatings);
    };

    const handleFinish = () => {
        let allQuestionsAnswered = true;

        // Iterate through selectedRatings array to check if any rating is still null
        selectedRatings.forEach((rating, index) => {
            console.log(rating);
            if (rating === null) {
                allQuestionsAnswered = false;
            }
        });

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
            {questions.map((question, index) => (
                <LikertScaleQuestion 
                key={index}
                question={question}
                onRatingChange={(value) => handleRatingChange(value, index)}/>
            ))}
            <Button title='Continue' onPress={handleFinish}/>
        </View>
    );
};
export default SurveyScreen;