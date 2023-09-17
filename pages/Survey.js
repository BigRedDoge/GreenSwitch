import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';
import Likert from './Likert';

const SurveyScreen = ({ navigation }) => {

    const testLikerts = [
        new Likert(136627, "How satisfied are you with the performance?", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]),
        new Likert(123627, "How would you rate the design of this app?", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]),
        new Likert(152362, "Did you find the user interface intuitive?", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"])
    ];

    // State to store the likerts
    const [likerts, setLikerts] = useState(testLikerts);

    // State to store the ratings
    const [ratings, setRatings] = useState(new Array(testLikerts.length).fill(null));
    // If every rating satisfies condiition, true
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(ratings.every(rating => rating !== null));
    useEffect(() => {
        setAllQuestionsAnswered(ratings.every(rating => rating !== null));
    }, [ratings]);
    

    const handleRatingUpdate = (index, value) => {
        // Update ratings array
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    
        // Update score in the corresponding Likert object
        const updatedLikerts = [...likerts];
        updatedLikerts[index].score = value;
        setLikerts(updatedLikerts);
    };
    
    const handleFinish = () => {
        console.log("\n");
        likerts.forEach((item, index) => {
            console.log(item, index);
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