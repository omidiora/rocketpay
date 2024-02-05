import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screen/Onboarding/OnboardingScreen';
import BottomNavigation from './BottomNavigation';
import AuthNavigation from './AuthNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="auth" component={AuthNavigation} />
      <Stack.Screen name="Dasbhoard" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
