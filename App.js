import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './pages/Login';
import SurveyScreen from './pages/Survey';
import ResultScreen from './pages/Result';
import AdminScreen from './pages/Admin';
import LeaderboardScreen from './pages/Leaderboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#adb29e"
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#adb29e',
          },
          headerTintColor: '#3f403c',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
