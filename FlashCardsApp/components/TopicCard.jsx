// TopicCard.js
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const TopicCard = ({ topic }) => {
  return (
    <View key={topic.slug} style={styles.card}>
      <Text style={styles.title}>{topic.name}</Text>
      <Text style={styles.count}>Cards: {topic.countCards}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    width: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  count: {
    fontSize: 16,
    color: 'dimgray',
  },
});

export default TopicCard;
