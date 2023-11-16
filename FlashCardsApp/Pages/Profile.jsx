import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserContext } from '../contexts/Theme';
import { getUsers } from '../api';

export default function Profile({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ username: '' });

  useEffect(() => {
    async function fetchUsers() {
      const userResult = await getUsers();
      const foundUser = userResult.find((u) => {
        return u.username === user.username;
      });
      setCurrentUser(foundUser);
    }
    fetchUsers();
  }, []);
  const logout = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.root}>
      <Text> Hello {currentUser.username}! </Text>
      <TouchableOpacity>
        <Image
          style={styles.profileImg}
          source={{
            uri: 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif',
          }}
        />
      </TouchableOpacity>
      <Text>Email: {currentUser.email}</Text>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
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
