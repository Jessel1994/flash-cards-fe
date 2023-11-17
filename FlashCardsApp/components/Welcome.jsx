import { View, Text, StyleSheet, Image } from 'react-native';
import { UserContext } from '../contexts/Theme';
import React, { useContext } from 'react';
import { welcome } from '../img';

const Welcome = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text
        style={{
          margin: 18,
          fontWeight: 600,
          fontSize: 20,
        }}>
        Welcome, {user.username}
      </Text>
      <Text>Continue learning: ...</Text>
      <Image
        style={{
          width: 300,
          height: 200,
        }}
        source={require('../img/welcome.png')}
      />
    </View>
  );
};

export default Welcome;

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
