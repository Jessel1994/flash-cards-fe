import { View, Text } from 'react-native';
import { UserContext } from '../contexts/Theme';
import React, { useContext } from 'react';

const Welcome = () => {
  const { user } = useContext(UserContext);

  return (
    <View>
      <h1>Welcome, {user.username}</h1>
      <Text>Continue learning: ...</Text>
    </View>
  );
};

export default Welcome;
