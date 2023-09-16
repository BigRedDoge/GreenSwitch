<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import SurveyScreen from './pages/Survey';
import ResultScreen from './pages/Result';
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Results from './Results.js';
>>>>>>> origin/backend

export default function App() {



  // Define the onPressLearnMore function
  // const onPressLearnMore = () => {
  //   Alert.alert('Button Pressed!', 'You pressed the Learn More button.');
  // };

  // const onPressLogin = () => {
  //   if(username=="michael1" && password=="123") {
  //     Alert.alert("Logging in...");
  //   }
  // };

  // const [username, onChangeUsername] = React.useState('');
  // const [password, onChangePassword] = React.useState('');

  const Stack = createStackNavigator();

  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Survey" component={SurveyScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
=======
    <Results />
  );
  /*
  const [data, setData] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/data").then((res) =>
      res.json().then((data) => {
        setData({
          name: data.Name,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World! {count}</Text>
      <Hello name="name" />
      <Text>{data.name}</Text>
      <Text>{data.age}</Text>
      <Text>{data.date}</Text>
      <Text>{data.programming}</Text>
      <Button 
        onPress={() => setCount(count + 1)}
        title="Click me"
      />
      <StatusBar style="auto" />
    </View>
>>>>>>> origin/backend
  );
  */
}


const Hello = props => {
  return (
    <View>
      <Text>Hello {props.name}</Text>
    </View>
  );
}
