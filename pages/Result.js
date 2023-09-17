import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ResultScreen = () => {
  // Sample data for the bar graph (replace with your actual data)
  const data = {
    labels: ['Question 1', 'Question 2', 'Question 3'],
    datasets: [
      {
        data: [4, 3, 5], // Sample values for the questions
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Result Screen</Text>

      {/* Bar Chart */}
      <BarChart
        data={data}
        width={300}
        height={200}
        yAxisLabel=""
        yAxisSuffix="p" // Remove the suffix
        chartConfig={{
          backgroundGradientFrom: '#ffffff', // Change background color gradient start
          backgroundGradientTo: '#ffffff',   // Change background color gradient end
          color: (opacity = 1) => `rgba(63, 64, 60, ${opacity})`, // Change bar color
          labelColor: (opacity = 1) => `rgba(63, 64, 60, ${opacity})`, // Change label color
          style: {
            marginVertical: 20, // Increase margin to create space for yAxis label
          },
        }}
        style={styles.chart}
      />

      {/* Add your main content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#798a73', // Primary color
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f403c', // Text color
    marginBottom: 20,
  },
  chart: {
    marginVertical: 20,
  },
  // Add additional styles for your main content here
});

export default ResultScreen;
