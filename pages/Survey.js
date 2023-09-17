import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';
import Likert from './Likert';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const SurveyScreen = ({ navigation }) => {

    const getLikerts = () => {
        // Fetch likerts from the database
        fetch("http://127.0.0.1:5000/get_questions")
            .then(response => response.json())
            .then(data => {
                let likerts = [];
                data.forEach((item, index) => {
                    likerts.push(new Likert(item.id, item.question, item.subtitles));
                });
                console.log("Likerts:", likerts)
                setLikerts(likerts);
                //return likerts;
            })
            .catch(error => {
                console.error("Error during fetch:", error);
            });
    };

    useEffect(() => {
        getLikerts();
    }, []);
    // State to store the likerts
    const [likerts, setLikerts] = useState([]);

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