// Topics.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import TopicCard from '../components/TopicCard';
import axios from 'axios';
import AddTopic from '../components/AddTopic';
const url = 'https://flash-cards-be.onrender.com/api/topics';

export default function Topics({ navigation }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setTopics(response.data);
      })
      .catch(() => {})
      .finally(setIsLoading(false));
  }, [update]);

  return (
    <ScrollView>
      {isLoading ? <ActivityIndicator style={{ margin: 50 }} /> : null}
      {topics.map((topic) => (
        <View>
          <TopicCard key={topic.slug} topic={topic} />
          <TouchableOpacity
          onPress={() => navigation.navigate('View Cards', { topic })}>
          
        </TouchableOpacity>
        </View>
        
      ))}
      <AddTopic setUpdate={setUpdate} />
    </ScrollView>
  );
}
