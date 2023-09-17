import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LikertScaleQuestion({ question, optionSubtitles, onAnswerChange }) {
  const [rating, setRating] = useState(null);

  const handleRatingPress = (value) => {
    setRating(value);
    onAnswerChange(value);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      {/* Likert Scale */}
      <View style={styles.scaleContainer}>
        {optionSubtitles.map((subtitle, index) => {
        const value = index + 1;
        return (
          <View style={styles.subtitleContainer} key={value}>
            <Text style={styles.subtitleText}>{subtitle}</Text>
            <TouchableOpacity
              style={[
                styles.scaleItem,
                rating === value && styles.selectedScaleItem,
              ]}
              onPress={() => handleRatingPress(value)}
            >
            <Text style={styles.scaleText}>{value}</Text>
            </TouchableOpacity>
          </View>
        );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scaleItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  selectedScaleItem: {
    backgroundColor: '#3cb371',
  },
  scaleText: {
    fontSize: 16,
  },
});