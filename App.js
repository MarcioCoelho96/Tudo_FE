import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PhoneNumberScreen from './src/screens/PhoneNumberScreen'
import OTPVerificationScreen from './src/screens/OTPVerificationScreen'
import HomeScreen from './src/screens/HomeScreen'
import CategoryDetailScreen from './src/screens/CategoryDetailScreen'
import MyOrderScreen from './src/screens/MyOrderScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="MyOrder" component={MyOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
