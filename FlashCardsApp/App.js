import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignUpForm from './components/SignUp';
import PostFlashCard from './components/PostFlashCard';
import Login from './components/Login';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PostFlashCard" component={PostFlashCard} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <SignUpForm />
    
      <Text>Welcome to the Flash Cards App!</Text>
      
      <Text>Here you can make yourself flashcards and revise!</Text>
      
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
