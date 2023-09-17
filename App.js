import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState({
        data: []
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "test1",
        password: "test1",
      })
    }).then((res) =>  {
      res.json().then((data) => {
        setData({
          data: data
        });
      })
    });
    fetch("http://127.0.0.1:5000/get_questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>  {
      res.json().then((data) => {
        console.log(data);
      })
    });


    /*fetch("http://127.0.0.1:5000/data").then((res) =>
      res.json().then((data) => {
        setData({
          data: data
        });
      })
    );*/
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
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


