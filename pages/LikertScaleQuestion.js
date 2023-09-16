import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LikertScaleQuestion({ question, onAnswerChange }) {
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
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.scaleItem,
              rating === value && styles.selectedScaleItem,
            ]}
            onPress={() => handleRatingPress(value)}
          >
            <Text style={styles.scaleText}>{value}</Text>
          </TouchableOpacity>
        ))}
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