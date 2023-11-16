import FlipCard from 'react-native-flip-card';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getSingleCard, updateCardIsCorrect } from '../api';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const route = useRoute();
  const { card_id, handleNext, index, handleBack, setIsCorrect } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [singleCard, setSingleCard] = useState({});
  const [cardAssessed, setCardAssessed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSingleCard(card_id)
      .then((card) => {
        setIsLoading(false);
        setSingleCard(card);
      })
      .catch((error) => {});
    setIsCorrect(singleCard?.isCorrect || false);
  }, [card_id]);

  const handleCorrectPress = async () => {
    setSingleCard((currentCard) => ({ ...currentCard, isCorrect: true }));
    setIsCorrect(true);
    setCardAssessed(true);
    try {
      await updateCardIsCorrect(
        card_id,
        singleCard.answer,
        singleCard.topic,
        true
      );
    } catch (error) {
      setSingleCard((currentCard) => ({ ...currentCard, isCorrect: false }));
      setIsCorrect(false);
      setCardAssessed(false);
      console.error('Error updating card:', error);
    }
  };

  const handleIncorrectPress = async () => {
    setSingleCard((currentCard) => ({ ...currentCard, isCorrect: false }));
    setIsCorrect(false);
    setCardAssessed(true);
    try {
      await updateCardIsCorrect(
        card_id,
        singleCard.answer,
        singleCard.topic,
        false
      );
    } catch (error) {
      // setSingleCard((currentCard) => ({
      //   ...currentCard,
      //   isCorrect: true,
      // }));
      console.error('Error updating card:', error);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text style={styles.pageUpdates}>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {singleCard ? (
        <View>
          <FlipCard
            flip={isFlipped}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            clickable={true}
            alignHeight={true}
            style={styles.card}>
            {/* Front Side */}
            <View style={[styles.face, styles.cardSide]}>
              <Text style={styles.cardtext}>
                {isFlipped ? singleCard.answer : singleCard.question}
              </Text>
            </View>
            {/* Back Side */}

            <View style={[styles.back, styles.cardSide]}>
              <Text style={styles.cardtext}>
                {isFlipped ? singleCard.question : singleCard.answer}
              </Text>

              {/* Correct / Incorrect Buttons */}

              <View style={styles.buttonsContainer}>
                <Pressable
                  onPress={() => {
                    handleCorrectPress();
                  }}
                  style={({ pressed }) => [
                    styles.correctBtn,
                    {
                      backgroundColor: pressed ? 'darkgreen' : '#228b22',
                    },
                  ]}>
                  <Text style={styles.buttonText}>Correct Answer</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    handleIncorrectPress();
                  }}
                  style={({ pressed }) => [
                    styles.incorrectBtn,
                    { backgroundColor: pressed ? 'darkred' : '#ff7f50' },
                  ]}>
                  <Text style={styles.buttonText}>Incorrect Answer</Text>
                </Pressable>
              </View>
            </View>
          </FlipCard>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.backButton}
              disabled={index === 0 ? true : false}
              onPress={() => handleBack(index)}>
              <Text style={styles.buttonText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => handleNext(index)}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.pageUpdates}>loading...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: '400px', // You may need to adjust this to a fixed size or use flex
    minHeight: '250px', // Adjust the height accordingly
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // If the card is white
    borderRadius: 10, // Rounded corners
    // Add shadows if needed to lift the card from the background
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navigationButtons: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space out the 'Back' and 'Next' buttons
    alignItems: 'center', // Center buttons vertically
    width: '100%', // Ensure the container takes full width of the card
    marginTop: 20, // Space from the card or bottom of the screen
  },
  backButton: {
    backgroundColor: '#007AFF', // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners for buttons
    minWidth: 100, // Minimum width for the 'Back' button
    alignItems: 'center', // Center text horizontally
  },
  nextButton: {
    backgroundColor: '#007AFF', // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners for buttons
    minWidth: 100, // Minimum width for the 'Next' button
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#fff', // White color for the button text
    fontSize: 16, // Font size for the button text
    fontWeight: 'bold', // Bold font weight for the button text
  },
  cardtext: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  face: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
