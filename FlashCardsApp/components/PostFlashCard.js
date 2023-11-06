import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const PostFlashCard = () => {
 
  const [questionBody, setQuestionBody] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [topicBody, setTopicBody] = useState("");

  const handleSaveCard = () => {};
  const handleDeleteCard = () => {};

  return (
    // styles to add later
    <View style={styles.container}>
     
      <View style={styles.inputContainer}>
        <Text>Type Question Here</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Question Here"
          value={questionBody}
          onChangeText={setQuestionBody}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Type Answer Here</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Answer Here"
          value={answerBody}
          onChangeText={setAnswerBody}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text>Topic</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Topic Here"
          value={topicBody}
          onChangeText={setTopicBody}
        />
      </View>

      <Button onPress={handleSaveCard} title="Save card" style={styles.saveButton}></Button>

      <Button onPress={handleDeleteCard} title="Delete card" style={styles.delButton}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: "10px",
    paddingHorizontal: 10,
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: "lightgreen",
  
  },
  delButton: {
    borderRadius: 10,
    backgroundColor: "red",
  },
});

export default PostFlashCard;
