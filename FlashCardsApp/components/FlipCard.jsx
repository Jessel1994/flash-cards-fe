import FlipCard from "react-native-flip-card";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { getSingleCard, updateCardIsCorrect } from "../api";
import Previous from "../img/arrow-button";
import Next from "../img/next-button";

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
      console.error("Error updating card:", error);
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
      console.error("Error updating card:", error);
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
            style={styles.card}
          >
            {/* Front Side */}
            <View style={[styles.face, styles.cardSide]}>
              <Text style={styles.titleText}>Question</Text>{" "}
              {/* Add title for the question side */}
              <Text style={styles.cardText}>
                {isFlipped ? singleCard.answer : singleCard.question}
              </Text>
            </View>
            {/* Back Side */}
            <View style={[styles.back, styles.cardSide]}>
              <Text style={styles.titleText}>Answer</Text>{" "}
              {/* Add title for the answer side */}
              <Text style={styles.cardText}>
                {isFlipped ? singleCard.question : singleCard.answer}
              </Text>
              {/* Correct / Incorrect Buttons */}
              <View style={styles.bottomButtonsContainer}>
                <Pressable
                  onPress={handleCorrectPress}
                  style={({ pressed }) => [
                    styles.correctBtn,
                    {
                      backgroundColor: pressed ? "#1c7a1c" : "#228b22", // darkgreen when pressed
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>Correct</Text>
                </Pressable>
                <Pressable
                  onPress={handleIncorrectPress}
                  style={({ pressed }) => [
                    styles.incorrectBtn,
                    {
                      backgroundColor: pressed ? "#cc5c54" : "#ff7f50", // darkred when pressed
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>Incorrect</Text>
                </Pressable>
              </View>
            </View>
          </FlipCard>
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.backButton}
              disabled={index === 0}
              onPress={() => handleBack(index)}
            >
              <Previous />

              <Text style={styles.buttonText}>Previous Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => handleNext(index)}
            >
              <Next />
              <Text style={styles.buttonText}>Next Card</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minWidth: 260, // Adjusted to match desired width
    minHeight: 400, // Adjusted to match desired height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Assuming a white background
    borderRadius: 20, // More rounded corners
    elevation: 10, // Increased for Android to give a floating effect
    shadowColor: "#000", // Corrected property name for iOS
    shadowOffset: { width: 0, height: 4 }, // Adjusted for more depth
    shadowOpacity: 0.3, // Slightly increased opacity for shadow
    shadowRadius: 5, // Smoothed shadow edges
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    color: '#000'
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30, // More rounded buttons
    minWidth: 120, // Adjusted width
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30, // More rounded buttons
    minWidth: 120, // Adjusted width
    alignItems: "center",
    color: "black",
  },
  cardText: {
    fontSize: 22, // Larger text for readability
    fontWeight: "bold", // Bold for emphasis
    textAlign: "center",
    marginHorizontal: 20, // Added horizontal margin
  },
  face: {
    justifyContent: "center",
    alignItems: "center", // Fixed alignContent to alignItems for consistency
  },
  cardSide: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Space out the buttons evenly
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  correctBtn: {
    paddingVertical: 10, // Increased padding for a larger button
    paddingHorizontal: 28, // Increased padding for a wider button
    borderRadius: 25, // Rounded edges
    backgroundColor: "#228b22", // Default green color

    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  incorrectBtn: {
    paddingVertical: 10, // Same as the correct button
    paddingHorizontal: 28, // Same as the correct button
    borderRadius: 25, // Rounded edges
    backgroundColor: "#ff7f50", // Default red color
    // Add shadow if desired
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 14, // Adjust as needed
    fontWeight: "bold", // Bold text
  },
});

export default Card;
