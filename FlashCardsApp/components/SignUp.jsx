import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { getUsers, postUsers } from '../api';

const SignUpForm = ({ navigation }) => {
  const [postedUser, setPostedUser] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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

      // Assuming you have a signUp function that handles the API call
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

      <Button
        title={isSigningUp ? "Signing Up..." : "Sign Up"}
        onPress={handleSignUp}
        style={styles.signUpButton}
        disabled={isSigningUp}
      />
      {error && <Text>{error}</Text>}
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
    width: 343,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  signUpButton: {
    borderRadius: 100,
    backgroundColor: 'green',
    color: 'green',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  loginText: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 8,
  },
});

export default SignUpForm;
