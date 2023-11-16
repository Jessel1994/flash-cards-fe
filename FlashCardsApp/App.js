import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext, UserProvider } from './contexts/Theme';
import NotFoundScreen from './components/NotFoundScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SignUpForm from './components/SignUp';
import { PostFlashCard } from './components/PostFlashCard';
import { OptionsScreen } from './components/OptionsScreen';
import { ViewCards } from './components/ViewCards';
import Login from './components/Login';
import Card from './components/FlipCard';
import Topics from './Pages/Topics';
import Welcome from './components/Welcome';
import Profile from './Pages/Profile';

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <UserProvider>
      <NavigationContainer>
        {user ? <MainTabs /> : <AuthStack />}
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

const Stack = createStackNavigator();
const CardsStack = createStackNavigator();

function CardsStackNavigator() {
  return (
    <CardsStack.Navigator>
      <CardsStack.Screen name="Topics" component={Topics} />
      <CardsStack.Screen name="View Cards" component={ViewCards} />
      <CardsStack.Screen name="Card" component={Card} />
    </CardsStack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={MainTabs}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true, // Set to false if you don't want to display tab labels
      }}
    >
      <Tab.Screen
        name="Main"
        component={Welcome}
        options={{
          headerShown: false,
          tabBarLabel: 'Home', // Tab label
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name='View Cards'
        component={CardsStackNavigator}
        options={{
          tabBarLabel: 'View Cards',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cards' size={24} color='black' />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Study"
        component={CardsStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Study',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="light-bulb" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen name="Add Card" component={PostFlashCard} />
      <Tab.Screen name="Profile1" component={Profile} />

      <Tab.Screen
        name="Profile"
        component={CardsStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="profile" size={24} color="black" />
          ),
        }}
      />
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
