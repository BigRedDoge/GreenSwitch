import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const truncateString = (str, maxLen) => {
  if (str.length > maxLen) {
    return str.substring(0, maxLen - 3) + '...';
  }
  return str;
};

const ResultScreen = () => {
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch companies from the database
    fetch("http://54.198.183.99:5000/get_companies_scores")
      .then(response => response.json())
      .then(data => {
        setCompanyData(data); // Store the data in state
      })
      .catch(error => {
        console.error("get_companies_scores: error during fetch:", error);
      });

    // Fetch user data from the second API call
    fetch("http://54.198.183.99:5000/get_user_data") // Replace with the actual URL
      .then(response => response.json())
      .then(data => {
        setUserData(data); // Store the data in state
      })
      .catch(error => {
        console.error("get_user_data: error during fetch:", error);
      });
  }, []);

  // Render the charts only when both companyData and userData are available
  if (companyData && userData) {
    // Construct data2 using userData
    const data2 = {
      labels: Object.keys(userData).map(week => `Week ${week}`),
      datasets: [
        {
          data: Object.values(userData),
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Result Screen</Text>

        <BarChart
          data={{
            labels: Object.keys(companyData).map(name => truncateString(name, 14)), // Limit and truncate company names
            datasets: [
              {
                data: Object.values(companyData), // Use company scores as data
              },
            ],
          }}
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
  } else {
    // Display a loading message or spinner while data is being fetched
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Result Screen</Text>
        <Text>Loading data...</Text>
      </View>
    );
  }
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
