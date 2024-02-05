import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screen/Register/RegisterScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import OtpScreen from '../screen/Otp/OtpScreen';
import PasswordScreen from '../screen/Password/PasswordScreen';
import SignUp from '../screen/Dashboard/HomeAddress';
import DashoboardScreen from '../screen/Dashboard/WalletTab';
import OnboardingScreen from '../screen/Onboarding/OnboardingScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
         <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dasbhoard" component={BottomNavigation} />

      {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> */}
      {/**/}
      {/*
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="CreatePassword" component={PasswordScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="AlmostDone" component={AlmostDone} />
      <Stack.Screen name="Dashboard" component={DashoboardScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
