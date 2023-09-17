import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import LikertScaleQuestion from './LikertScaleQuestion';
import Likert from './Likert';

const SurveyScreen = ({ navigation }) => {

    // State to store the likerts
    const [likerts, setLikerts] = useState([]);
    // State to store the ratings
    const [ratings, setRatings] = useState([]);
    // If every rating satisfies condiition, true
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(ratings.every(rating => rating !== null));

    // Runs once
    useEffect(() => {
        // Fetch likerts from the database
        fetch("http://54.198.183.99:5000/get_questions")
        .then(response => response.json())
        .then(data => {
            let likerts = [];
            data.forEach((item, index) => {
                likerts.push(new Likert(item.id, item.question, item.subtitles));
            });
            setLikerts(likerts);
            setRatings(new Array(likerts.length).fill(null))
        })
        .catch(error => {
            console.error("get_questions: error during fetch:", error);
        });
    }, []);

    // Runs whenever ratings state changes
    useEffect(() => {
        setAllQuestionsAnswered(ratings.every(rating => rating !== null));
    }, [ratings]);
    
    // Handles whenever user selects/changes answer for any of the likerts
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
                console.log(index, item, data);
                if(data.success) {
                  navigation.navigate('Result');
                }
                else {
                  console.error('submit_score: data.success is false');
                }
            })
            .catch(error => {
              console.error("submit_score: Error during fetch:", error);
            });
        });
    };

    return (
    <ScrollView contentContainerStyle={styles.container}>
      {likerts.map((likert, index) => (
        <LikertScaleQuestion
          key={index}
          question={likert.question}
          optionSubtitles={likert.subtitles}
          onAnswerChange={(value) => handleRatingUpdate(index, value)}
        />
      ))}
      <TouchableOpacity
        style={[styles.finishButton, !allQuestionsAnswered && styles.disabledButton]}
        onPress={handleFinish}
        disabled={!allQuestionsAnswered}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#798a73', // Primary color
      alignItems: 'center',
      paddingVertical: 50,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#3f403c', // Text color
      marginBottom: 20,
    },
    finishButton: {
      backgroundColor: '#adb29e', // Primary color
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    disabledButton: {
      backgroundColor: '#e0dac9', // Disabled color
    },
    buttonText: {
      color: '#3f403c', // Text color
      fontSize: 18,
    },
    question: {
      flex: 1,
      flexWrap: 'wrap',
    },
  });
export default SurveyScreen;