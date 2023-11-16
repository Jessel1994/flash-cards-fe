import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { postCard, getTopics } from '../api';
import { UserContext } from '../contexts/Theme';

export const PostFlashCard = ({ navigation, route }) => {
  const [postedCard, setPostedCard] = useState(''); // post card to BE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [questionBody, setQuestionBody] = useState('');
  const [answerBody, setAnswerBody] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { user } = useContext(UserContext);
  const { topic } = route.params || 0;
  //fetching topics
  const defaultValue = topics.indexOf(topic) > -1 ? topics.indexOf(topic) : 0;

  useEffect(() => {
    setIsLoading(true);
    getTopics(user.username).then((fetchedTopics) => {
      setIsLoading(false);
      const topicNames = fetchedTopics.map((topic) => topic.name);
      setSelectedTopic(topic);
      setTopics(topicNames);
    });
  }, []);
  const handleSubmitNewCard = () => {
    const newCard = {
      question: questionBody,
      answer: answerBody,
      topic: selectedTopic,
    };
    if (
      user &&
      (questionBody.trim() !== '' || answerBody.trim() !== '' || !selectedTopic)
    ) {
      setIsSubmitting(true); // Start submitting
      postCard({ ...newCard, author: user.username })
        .then((card) => {
          setPostedCard(card);
          setQuestionBody('');
          setAnswerBody('');
          setSelectedTopic('');
          setIsSubmitting(false);
          // navigate back to the previous screen (CreateCardScreen)
          // navigation.navigate('Topics');
        })
        .catch((error) => {
          console.log('ERROR: ', error);
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
          value={questionBody}
          onChangeText={setQuestionBody}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Type Answer Here</Text>
        <TextInput
          multiline
          style={styles.input}
          value={answerBody}
          onChangeText={setAnswerBody}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Topic</Text>
        <SelectDropdown
          defaultValueByIndex={defaultValue}
          data={topics}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setSelectedTopic(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <Button
        disabled={questionBody.trim() === '' || answerBody.trim() === ''}
        title={isSubmitting ? 'The card is submitted' : 'Save card'}
        onPress={handleSubmitNewCard}
        style={styles.saveButton}
        accessibilityLabel='Press to save your flashcard'
      />
      <View>
        <FontAwesomeIcon icon='fa-solid fa-house' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: '10px',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: 'gray',
    borderRadius: 10,
  },
  labelText: {
    margin: 12,
    padding: 10,
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  delButton: {
    borderRadius: 10,
    backgroundColor: 'red',
  },
});
