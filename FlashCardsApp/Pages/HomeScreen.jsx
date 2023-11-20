import React from 'react';
import { Text, View, Pressable, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 300,
          height: 200,
        }}
        source={require('../img/adaptive-icon.png')}
      />
      <View>
        <Text style={styles.text}>Welcome to the Flash Cards App!</Text>
        <Text>Here you can make yourself flashcards and revise!</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
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
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    margin: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 12,
  },
});
