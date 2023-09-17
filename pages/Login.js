import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login, e.g., authentication
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    // Navigate to another screen after successful login
    navigation.navigate('Survey'); // Navigate to 'Survey'
  };

  const handleAdminButton = () => {

    navigation.navigate('Admin');
  };
  const handleLeaderboardButton = () => {
    // Navigate to the Admin screen
    navigation.navigate('Leaderboard');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Green Survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#3f403c"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#3f403c"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.adminButton} onPress={handleAdminButton}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.adminButton} onPress={handleLeaderboardButton}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#798a73', // Primary color
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3f403c', // Text color
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e0dac9', // Corrected value with #
    color: '#3f403c', // Text color
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#798a73', // Primary color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  adminButton: {
    backgroundColor: '#798a73', // Primary color
    paddingVertical: 5, // Adjusted padding
    paddingHorizontal: 10, // Adjusted padding
    borderRadius: 5,
    marginTop: 10, // Adjusted margin top
  },
  buttonText: {
    color: '#3f403c', // Text color
    fontWeight: 'bold',
    fontSize: 20,
  },
});
