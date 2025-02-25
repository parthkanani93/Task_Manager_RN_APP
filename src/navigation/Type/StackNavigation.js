import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local Imports
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen
        name={StackNav.HomeScreen}
        component={StackRoute.HomeScreen}
      />
      <Stack.Screen
        name={StackNav.AddProductScreen}
        component={StackRoute.AddProductScreen}
      />
      <Stack.Screen
        name={StackNav.ProductDetailScreen}
        component={StackRoute.ProductDetailScreen}
      />
      <Stack.Screen name={StackNav.Signup} component={StackRoute.Signup} />
      <Stack.Screen name={StackNav.Login} component={StackRoute.Login} />
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.ForgotPassword}
        component={StackRoute.ForgotPassword}
      />
      <Stack.Screen
        name={StackNav.ResetPassword}
        component={StackRoute.ResetPassword}
      />
      <Stack.Screen name={StackNav.Connect} component={StackRoute.Connect} />
    </Stack.Navigator>
  );
}
