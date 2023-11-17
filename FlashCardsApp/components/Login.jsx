import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext, UserProvider } from '../contexts/Theme';
import { getUsers } from '../api';

const Login = ({ navigation }) => {
  const {user, setUser} = useContext(UserContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profiles, setProfiles] = useState([])
  const [loginError, setLoginError] = useState(null)


  useEffect (() => {
    getUsers().then((response) => {
     
      setProfiles(response)
      
    })
  }, [])
 
 

  const handleLogIn = () => {
    
    const foundUser = profiles.find(profile => profile.username === username && profile.password === password);
    
    if (foundUser) {
      setUser(foundUser); // Set the found user in context
      
      setUsername(""); // Clear the username state
      setPassword(""); // Clear the password state
      navigation.navigate('Welcome'); // Navigate to the next screen
    } else {
      setLoginError("Invalid username or password");
    }
  };
  

  const navigateToSignUp = () => {
    // Use navigation to navigate to the "SignUp" page
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => {setUsername(text)}}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {setPassword(text)}}
        />
      </View>
      {loginError && <Text>{loginError}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signupText}>Haven't got an account? Sign Up</Text>
      </TouchableOpacity>
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the container takes the full screen height
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    padding: 20, // Add some padding around the screen
    backgroundColor: '#fff', // Assuming the background is white
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20, // Add some margin at the bottom of each input container
  },
  input: {
    width: '100%',
    height: 50, // Increase the height for a bigger touch area
    borderWidth: 1,
    borderColor: '#ddd', // A lighter border color
    borderRadius: 25, // Round the corners
    paddingHorizontal: 15, // Horizontal padding within the input
    fontSize: 16, // Increase the font size
    backgroundColor: '#f7f7f7', // A light gray background color for the input field
  },
  button: { // This style is for the login button
    width: '100%',
    height: 50, // Match the height of the text inputs
    backgroundColor: '#34C759', // The green color from the image
    justifyContent: 'center', // Center the text inside the button
    alignItems: 'center', // Center the text horizontally
    borderRadius: 25, // Round the corners
    marginTop: 10, // Add some margin at the top
  },
  buttonText: { // This style is for the text inside the button
    color: '#fff', // White text color
    fontSize: 18, // Increase the font size
    fontWeight: 'bold', // Make the text bold
  },
  signUpButton: {
    // Removed as we're going to style the Button component directly
  },
  signupText: {
    textDecorationLine: 'none', // Remove the underline as it's not present in the image
    color: '#000', // Black color for the text
    marginTop: 20, // Add more space before the sign-up prompt
    fontSize: 16, // Match the font size with inputs
  },
  errorText: {
    color: 'red', // Assuming the error text should be red
    marginBottom: 20, // Space between error text and input fields
  },
});


export default Login;
