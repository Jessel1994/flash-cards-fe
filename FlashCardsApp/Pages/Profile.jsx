import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserContext } from '../contexts/Theme';
import { getUsers } from '../api';

export default function Profile({ navigation }) {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ username: '' });
  useEffect(() => {
    async function fetchUsers() {
      const userResult = await getUsers();
      console.log(userResult, 'users');
      const foundUser = userResult.find((u) => {
        return u.username === user.username;
      });
      console.log(foundUser, 'found user');

      setCurrentUser(foundUser);
    }
    fetchUsers();
  }, []);

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.root}>
      <Text> Hello {currentUser.username}! </Text>
      <TouchableOpacity style={styles.profileImg}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
      </TouchableOpacity>

      <Text>{currentUser.username}</Text>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Upload Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 20,
  },
});
