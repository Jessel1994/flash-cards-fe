// Topics.js
import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import TopicCard from "../components/TopicCard";

const dataTopics = [
  {
    name: "Topic 1",
    countCards: 5,
  },
  {
    name: "Topic 2",
    countCards: 45,
  },
  {
    name: "Topic 3",
    countCards: 10,
  },
  {
    name: "Topic 4",
    countCards: 15,
  },
];

export default function Topics() {
  const [topics, setTopics] = useState(dataTopics);

  const addNewTopic = () => {
    const newTopic = {
      name: `New Topic ${topics.length + 1}`,
      countCards: 0,
    };

    setTopics([...topics, newTopic]);
  };

  return (
    <View>
      {topics.map((topic) => (
        <TopicCard key={topic.name} topic={topic} />
      ))}
      <Button title="Add New Topic" onPress={addNewTopic} />
    </View>
  );
}
