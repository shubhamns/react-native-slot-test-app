import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './src/splash';
import HomeScreen from './src/screens/Home';
import UserScreen from './src/screens/User';

const Stack = createStackNavigator();

const App: () => Node = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);

  return (
    <>
      {isSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="User" component={UserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
