import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function LikertScaleQuestion({ question, optionSubtitles, onAnswerChange }) {
  const [rating, setRating] = useState(null);

  const handleRatingPress = (value) => {
    setRating(value);
    onAnswerChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      
      {/* Subtitles */}
      <View style={styles.subtitlesContainer}>
        {Array.isArray(optionSubtitles) &&
          optionSubtitles.length > 0 &&
          optionSubtitles.map((subtitle, index) => (
            <View
              key={index}
              style={[
                styles.subtitle,
                {
                  width: `${100 / optionSubtitles.length}%`, // Equal width for each subtitle
                },
              ]}
            >
              <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
          ))}
      </View>
      
      {/* Likert Scale */}
      <View style={styles.scaleContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.scaleItem,
              rating === value && styles.selectedScaleItem,
              {
                flex: 1, // Equal flex for each scale item to evenly space them
              },
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
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 50,
    mapHorizontal: 10,
    marginTop: 5,
  },
  scaleItem: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#adb29e',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    marginBottom: 55,
  },
  selectedScaleItem: {
    backgroundColor: '#3cb371',
  },
  scaleText: {
    fontSize: 19,
  },
  subtitlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enable text wrapping
    justifyContent: 'center',
    marginBottom: 5,
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#798a73',
    padding: 5,
  },
  subtitleText: {
    fontSize: 18,
  },
});
