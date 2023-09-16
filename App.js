import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/Login';
import SurveyScreen from './app/Survey';
import ResultScreen from './app/Result';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Survey" component={SurveyScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
