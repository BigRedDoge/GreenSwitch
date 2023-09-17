import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ResultScreen = () => {
  // Sample data for the first bar graph
  const data1 = {
    labels: ['Company A', 'Company B', 'Company C'],
    datasets: [
      {
        data: [400, 320, 550], // Sample values for the first chart
      },
    ],
  };

  // Sample data for the second bar graph
  const data2 = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [15, 25, 10, 15], // Sample values for the second chart
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Result Screen</Text>

      {/* First Bar Chart */}
      <BarChart
        data={data1}
        width={400} // Increase width
        height={300} // Increase height
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

      {/* Second Bar Chart */}
      <BarChart
        data={data2}
        width={400} // Increase width
        height={300} // Increase height
        yAxisLabel=""
        yAxisSuffix="" // No suffix for the second chart
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

});

export default ResultScreen;
