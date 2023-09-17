<<<<<<< HEAD
=======

>>>>>>> c241944a470b3af20ed736d4503d13083de4690b
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import SurveyScreen from './pages/Survey';
import ResultScreen from './pages/Result';

export default function App() {

  useEffect(() => {
    // Replace the URL with your API endpoint
    fetch('https://my-api.com/strings')
      .then(response => response.json())
      .then(strings => {
        setData(strings);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
