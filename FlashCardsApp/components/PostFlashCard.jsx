import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { postCard, getTopics } from "../api";
import { OptionsScreen } from "./OptionsScreen";
import { UserContext } from "../contexts/Theme";


export const PostFlashCard = ({ navigation, route }) => {
  const [postedCard, setPostedCard] = useState(""); // post card to BE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [questionBody, setQuestionBody] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { user } = useContext(UserContext);
  console.log('User in PostFlashCard:', user);

  //fetching topics
  useEffect(() => {
    setIsLoading(true);
    getTopics().then((fetchedTopics) => {
      console.log("fetchedTopics: >>>", fetchedTopics)
      setIsLoading(false);
      const topicNames = fetchedTopics.map(topic => topic.name);
      setTopics(topicNames)
    })
  }, [])

  const handleSubmitNewCard = () => {
    const newCard = {
      question: questionBody,
      answer: answerBody,
      topic: selectedTopic,
    };
    if (user && (questionBody.trim() !== "" ||
      answerBody.trim() !== "" ||
      !selectedTopic)
    ) {
      setIsSubmitting(true); // Start submitting
      postCard({...newCard, author: user})
        .then((card) => {
          setPostedCard(card);
          setQuestionBody("");
          setAnswerBody("");
          setSelectedTopic('')
          setIsSubmitting(false);
          // navigate back to the previous screen (CreateCardScreen)
          navigation.goBack();
        })

        .catch((error) => {
          console.log("ERROR: ", error);
          setError(error);
        });
    }
  };


  return (
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
        <SelectDropdown 
          data = {topics}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setSelectedTopic(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem 
          }}
          rowTextForSelection={(item, index) => {
          return item
        }}
        />
      </View>

      <Button
        disabled={questionBody.trim() === "" || answerBody.trim() === ""}
        title={isSubmitting ? "The card is submitted" : "Save card"}
        onPress={handleSubmitNewCard}
        style={styles.saveButton}
        accessibilityLabel="Press to save your flashcard"
      ></Button>

      {/* <Button
        onPress={handleDeleteCard}
        title="Delete card"
        style={styles.delButton}
      ></Button> */}
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
