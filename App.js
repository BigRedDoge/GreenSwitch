import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Results from './Results.js';

export default function App() {
  return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
