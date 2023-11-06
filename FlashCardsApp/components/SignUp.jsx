import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const SignUpForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
  };

  const navigateToLogin = () => {
    // Use navigation to navigate to the "Login" page
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

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

      <Button title="Sign Up" onPress={handleSignUp} style={styles.signUpButton} />
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
  loginText: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 8,
  },
});

export default SignUpForm;
