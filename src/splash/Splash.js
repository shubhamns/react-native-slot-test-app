import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
  },
});

export default Splash;
