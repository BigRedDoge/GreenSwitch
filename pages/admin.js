import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const AdminScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Dummy list of questions (you can replace this with actual data)
  const [questions, setQuestions] = useState([
    { id: '1', text: 'How would you rate the design of this app?' },
    { id: '2', text: 'How satisfied are you with the performance?' },
    { id: '3', text: 'Did you find the user interface intuitive?' },
  ]);

  // Function to delete a question
  const deleteQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Screen</Text>

      {/* Add admin-specific content and functionality here */}
      <View style={styles.adminContent}>
        <Text style={styles.adminText}>Welcome, Admin User!</Text>

        {/* Button to add a new question */}
        <Button
          title="Add New Question"
          onPress={() => {
            // Navigate to a screen to create a new question
            // You can implement this screen as needed
            navigation.navigate('CreateQuestion');
          }}
        />

        {/* List of questions with options to delete */}
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.questionItem}>
              <Text style={styles.questionText}>{item.text}</Text>
              <Button
                title="Delete"
                onPress={() => deleteQuestion(item.id)}
              />
              {/* Add options for editing questions here */}
            </View>
          )}
        />
      </View>

      {/* Logout button */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#798a73', // Primary color
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f403c', // Text color
    marginBottom: 20,
  },
  adminContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  adminText: {
    fontSize: 16,
    color: '#3f403c', // Text color
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#3f403c',
  },
});

export default AdminScreen;
