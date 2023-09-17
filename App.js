
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import SurveyScreen from './pages/Survey';
import ResultScreen from './pages/Result';

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

      <Text>Hello {props.name}</Text>
    </View>
  );
}
