import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


export const CreateCardScreen = ({ navigation, route }) => {
  useEffect (() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title="Create card"
      onPress={() => navigation.navigate('PostFlashCard')}
    />
    <Text style={{ margin: 10 }}>Card: {route.params?.post}</Text>
  </View>

  )
    }


export const PostFlashCard = ({ navigation, route }) => {
 
  const [questionBody, setQuestionBody] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [topicBody, setTopicBody] = useState("");
  const [deckName, setDeckName] = useState("");

  const handleSaveCard = () => {};
  const handleDeleteCard = () => {};

  return (
    // styles to add later
    <View style={styles.container}>
     
      <View style={styles.inputContainer}>
        <Text>Type Question Here</Text>
        <TextInput
          multiline
          style={styles.input}
          placeholder="Enter Question Here"
          value={questionBody}
          onChangeText={setQuestionBody}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Type Answer Here</Text>
        <TextInput
          multiline
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

      <View style={styles.inputContainer}>
        <Text>Deck</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Deck Here"
          value={deckName}
          onChangeText={setDeckName}
        />
      </View>

      <Button title="Save card"
      onPress={() => {

      handleSaveCard();
      navigation.navigate({
            name: 'CreateCardScreen',
            params: { post: questionBody},
            merge: true,
      });
       }} style={styles.saveButton}></Button>

      <Button onPress={handleDeleteCard} title="Delete card" style={styles.delButton}></Button>
      <View>
      <FontAwesomeIcon icon="fa-solid fa-house" />
    </View>
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

// export default PostFlashCard;
