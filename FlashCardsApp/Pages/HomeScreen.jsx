import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Flash Cards App!</Text>
      <Text>Here you can make yourself flashcards and revise!</Text>
      <Pressable
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <StatusBar style='auto' />
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
