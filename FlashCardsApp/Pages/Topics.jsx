import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import TopicCard from '../components/TopicCard';
import { getTopics } from '../api';
import AddTopic from '../components/AddTopic';

export default function Topics({ navigation }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function loadTopics() {
      setTopics(await getTopics());
    }
    loadTopics();
    setIsLoading(false);
  }, [update]);

  const onLongPressHandler = (topic) => {
    setModalVisible(true);
  };

  const onPressHandler = (topic) => {
    navigation.navigate('View Cards', { topic });
  };

  return (
    <View>
      <Text
        style={{
          margin: 8,
          fontWeight: 600,
          fontSize: 20,
        }}>
        Choose a topic to start learning!
      </Text>
      <ScrollView horizontal={true} style={{ paddingBottom: 12 }}>
        {isLoading ? <ActivityIndicator style={{ margin: 50 }} /> : null}
        {topics.map((topic) => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            onLongPressHandler={onLongPressHandler}
            onPressHandler={onPressHandler}
            setUpdate={setUpdate}
          />
        ))}
      </ScrollView>
      <AddTopic setUpdate={setUpdate} />
    </View>
  );
}
