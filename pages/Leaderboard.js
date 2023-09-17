import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Leaderboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch companies from the database
    fetch("http://54.198.183.99:5000/get_company_leaderboard")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserData(data); // Store the data in state
      })
      .catch(error => {
        console.error("get_company_leaderboard: error during fetch:", error);
      });
  }, []);

  // Transform userData into an array of objects
  const leaderboardData = userData
    ? Object.entries(userData).map(([name, score]) => ({ name, score }))
    : [];

  // Sort leaderboardData by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  // Render each leaderboard item
  const renderItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.username}>{item.name}</Text>
      <Text style={styles.score}>{item.score} points</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Scores</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#798a73', // Primary color
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f403c', // Text color
    marginBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    width: '89%', // Adjusted width to 100%
    marginVertical: 5,
    borderRadius: 5,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Leaderboard;
