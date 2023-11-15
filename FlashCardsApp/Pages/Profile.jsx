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
        return u.username === user;
      });
      console.log(foundUser);
      setCurrentUser(foundUser);
    }
    fetchUsers();
  }, []);
  console.log(currentUser);

  return (
    <View style={styles.root}>
      <Text> Hello {currentUser.username}! </Text>
      <TouchableOpacity style={styles.profileImg}>
        <Image
          source={{
            uri: 'https%3A%2F%2Fichef.bbci.co.uk%2Fnews%2F976%2Fcpsprodpb%2F17207%2Fproduction%2F_131472749_nannymcphee1.jpg&tbnid=m7sw0tb7PxtDiM&vet=12ahUKEwiYq9Tr6cWCAxVRkScCHUh_BtcQMygEegQIARBT..i&imgrefurl=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fuk-england-manchester-67157136&docid=vLCE08RUMZXMoM&w=976&h=549&q=cat&client=safari&ved=2ahUKEwiYq9Tr6cWCAxVRkScCHUh_BtcQMygEegQIARBT',
          }}
        />
      </TouchableOpacity>

      <Text>{currentUser.username}</Text>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Upload Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
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
