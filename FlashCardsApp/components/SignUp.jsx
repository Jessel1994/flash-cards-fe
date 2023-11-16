import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../contexts/Theme';

import { getUsers, postUsers } from '../api';

const SignUpForm = ({ navigation }) => {
  const [postedUser, setPostedUser] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const {user, setUser} = useContext(UserContext)
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  console.log(user)
  const handleSignUp = () => {
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError(null);
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError(null);
    }
    
    setIsSigningUp(true);

      
      postUsers(newUser)
      .then((user) => {
        setPostedUser(user);
        setUsername('');
        setPassword('');
        setEmail('');
        setIsSigningUp(false);

          
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.log("ERROR: ", error.response.data.msg);
          setError(error.response.data.msg);
          setIsSigningUp(false);
        });
    
  };

  const navigateToLogin = () => {
    // Use navigation to navigate to the "Login" page
    navigation.navigate('Login');
  };

  return  (
    <View style={styles.container}>
    
    <View style={styles.inputContainer}>
      <Text>Username</Text>
      {/* <Text>{user}</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        
      />
    </View>

    <View style={styles.inputContainer}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
    </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isSigningUp}>
        <Text style={styles.buttonText}>{isSigningUp ? "Signing Up..." : "Sign Up"}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

  
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginText}>Login if already registered</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Padding around the screen
    backgroundColor: '#fff', // White background
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15, // Space between input fields
  },
  input: {
    width: '100%',
    height: 50, // Height of the input field
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border color
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 15, // Padding inside the input field
    fontSize: 16, // Font size
    backgroundColor: '#f7f7f7', // Light gray background color for input
  },
  button: { // Styles for the sign up button
    width: '100%',
    height: 50, // Match the input field height
    backgroundColor: '#34C759', // Green color for the button
    justifyContent: 'center', // Center the label vertically
    alignItems: 'center', // Center the label horizontally
    borderRadius: 25, // Rounded corners
    marginTop: 10, // Space from the last input field
  },
  buttonText: { // Styles for the text inside the button
    color: '#fff', // White color text
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
  },
  errorText: {
    color: 'red', // Error messages in red
    marginBottom: 10, // Space between error message and input field
  },
  loginText: {
    textDecorationLine: 'none', // No underline
    color: '#000', // Black color text
    marginTop: 20, // Space from the button
    fontSize: 16, // Font size
  },
});


export default SignUpForm;
