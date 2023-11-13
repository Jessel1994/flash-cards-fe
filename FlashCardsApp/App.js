import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext, UserProvider } from './contexts/Theme';

const Stack = createStackNavigator();

import SignUpForm from './components/SignUp';
import { PostFlashCard } from './components/PostFlashCard';
import { OptionsScreen } from './components/OptionsScreen';
import { ViewCards } from './components/ViewCards';
import Login from './components/Login';
import Card from './components/FlipCard';
import Topics from './Pages/Topics';

export default function App() {
  
  return (
    <UserProvider>
      <NavigationContainer>
          <MyTabs />
      </NavigationContainer>
    </UserProvider>
    
  );
}

function HomeScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text>Welcome to the Flash Cards App!</Text>

      <Text>Here you can make yourself flashcards and revise!</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      
      <StatusBar style='auto' />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUpForm} />
      <Stack.Screen name='Card' component={Card} />
      <Stack.Screen name='Create Card' component={OptionsScreen} />
      <Stack.Screen name='View Cards' component={ViewCards} />
      <Stack.Screen name='Add Card' component={PostFlashCard} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const {user} = useContext(UserContext)
  
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Main'
        component={MyStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='View Cards' component={ViewCards} />
      <Tab.Screen name='Topics' component={Topics} />
    </Tab.Navigator>
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
