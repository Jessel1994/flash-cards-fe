import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { postCard } from "../api";
import {CreateCardScreen} from "./CreateCardScreen";

    

export const PostFlashCard = ({ navigation, route }) => {

 const [postedCard, setPostedCard] = useState('') // post card to BE
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState({});


  const [questionBody, setQuestionBody] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [topicBody, setTopicBody] = useState("");
  // const [deckName, setDeckName] = useState("");

  const handleSubmit = () => {
    const newCard = {
      question: questionBody,
      answer: answerBody,
      topic: topicBody
    }
    if(questionBody.trim() !=='' || answerBody.trim() !=='' || topicBody.trim() !==''){
    setIsSubmitting(true); // Start submitting
    postCard(newCard)
    .then((card) => {
        setPostedCard(card);
        setQuestionBody('');
        setAnswerBody('');
        setTopicBody('');
        setIsSubmitting(false);
        // Navigate back to the previous screen (CreateCardScreen)
        navigation.goBack();
    })

    .catch ((error) =>{
      console.log("ERROR: ", error)
      setError(error);
    })
  }
    

    
  };
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

      <Button 
       disabled={questionBody.trim() ==='' || answerBody.trim() ==='' || topicBody.trim() ===''}
        
      title={isSubmitting ? 'The card is submitted' : 'Save card'}
      onPress={handleSubmit} 
      style={styles.saveButton}
      accessibilityLabel="Press to save your flashcard"
  
      ></Button>


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

 
