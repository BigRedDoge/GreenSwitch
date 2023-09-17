import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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

  const [ratings, setRatings] = useState(new Array(likerts.length).fill(null));
  let allQuestionsAnswered = ratings.every(rating => rating !== null);

  const handleRatingUpdate = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleFinish = () => {
    if (allQuestionsAnswered) {
      // Write results to the database
      navigation.navigate('Result');
    } else {
      console.error("Please answer all questions before continuing.");
    }
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
