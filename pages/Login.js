import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {

    // useEffect(() => {
    //   fetch("http://127.0.0.1:5000/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: "test1",
    //       password: "test1",
    //     })
    //   });
    // }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logic for handling login, e.g., authentication
        fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        });
        // Navigate to another screen after successful login
        navigation.navigate('Survey'); // Navigate to 'Survey'
    };

    return (
        <View>
            <Text>Login Screen</Text>
            <TextInput 
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput 
              placeholder="Password" 
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
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