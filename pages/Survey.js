import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';
import Likert from './Likert';

const SurveyScreen = ({ navigation }) => {

    const getLikerts = () => {
        // Fetch likerts from the database
        fetch("http://54.198.183.99:5000/get_questions")
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
        setRatings(new Array(likerts.length).fill(null))
    }, []);
    // State to store the likerts
    const [likerts, setLikerts] = useState([]);

    // State to store the ratings
    const [ratings, setRatings] = useState([]);
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
            fetch("http://54.198.183.99:5000/submit_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: item.id,
                    score: item.score,
                })
            })
            .then(response => response.json())
            .then(data => {
                // Depending on your backend's response structure, adjust this
                // For example, if your backend sends `{ success: true }` on successful login:
                if (data.success) {
                    console.log(index, item, data.success);
                } else {
                    // Handle login failure, show an error message, etc.
                    console.error("Login failed:", data.message);
                }
            })
        });
        console.log("test");
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