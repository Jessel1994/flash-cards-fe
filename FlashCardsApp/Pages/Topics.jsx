import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { getTopics } from '../api';
import { UserContext } from '../contexts/Theme';
import AddTopic from '../components/AddTopic';
import TopicCard from '../components/TopicCard';
import { createStackNavigator } from '@react-navigation/stack';

export default function Topics({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const CardsStack = createStackNavigator();

  useEffect(() => {
    setIsLoading(true);
    async function loadTopics() {
      setTopics(await getTopics(user.username));
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
