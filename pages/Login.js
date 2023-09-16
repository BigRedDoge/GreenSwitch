import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const handleLogin = () => {
        // Logic for handling login, e.g., authentication
        // Navigate to another screen after successful login
        navigation.navigate('Survey'); // Navigate to 'Survey'
    };

    return (
        <View>
            <Text>Login Screen</Text>
            <TextInput placeholder="Username"/>
            <TextInput placeholder="Password" secureTextEntry={true}/>
            <Button title="Login" onPress={handleLogin}/>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });