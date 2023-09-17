import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Leaderboard = () => {
  // Dummy data of users ranked
  const leaderboardData = [
    { name: 'User 1', score: 1200 },
    { name: 'User 2', score: 1050 },
    { name: 'User 3', score: 950 },
    { name: 'User 4', score: 880 },
    { name: 'User 5', score: 750 },
    { name: 'User 6', score: 600 },
  ];

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
