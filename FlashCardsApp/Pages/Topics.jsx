// Topics.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import TopicCard from '../components/TopicCard';
import axios from 'axios';
import AddTopic from '../components/AddTopic';

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://flash-cards-be.onrender.com/api/topics')
      .then((response) => {
        console.log(response.data);
        setTopics(response.data);
      })
      .catch(() => {})
      .finally(setIsLoading(false));
  }, [update]);

  return (
    <View>
      {isLoading ? <ActivityIndicator style={{ margin: 50 }} /> : null}
      {topics.map((topic) =>
        topic.slug ? <TopicCard key={topic.slug} topic={topic} /> : null
      )}
      <AddTopic setUpdate={setUpdate} />
    </View>
  );
}
