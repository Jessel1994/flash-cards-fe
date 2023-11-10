import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../contexts/Theme';
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
 
 

  const handleLogIn = (username, password) => {
    
   
    
    
    console.log(username)
    setPassword(password)
    console.log(password)
    console.log(profiles)
    console.log(Boolean(profiles.find(user => user.username === username && user.password === password)))

    if(Boolean(profiles.find(user => user.username === username && user.password === password))) {
      return (username, password)
    } else {
      setLoginError("Invalid username or password")
      return loginError;

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
          onChangeText={text => setUsername(text)}
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

      <Button title="Log In" onPress={handleLogIn} style={styles.signUpButton} />
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signupText}>Haven't got an account? Sign Up</Text>
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
  signupText: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 8,
  },
});

export default Login;
