import React, { useState, useEffect } from "react";
import {
  View, ScrollView, Text,
  StyleSheet, TouchableOpacity,
} from "react-native";
import { getCards } from "../api";

export const ViewCards = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCards()
      .then((cards) => {
        setIsLoading(false);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>No Results Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardsAllContainer}>
    <ScrollView>
      {cards.map((card) => (
     
            <View style={styles.cardListItem} key={card._id}>
          
            <TouchableOpacity key={card._id} onPress={()=>{navigation.navigate('Card', {card_id: card._id})}}>
          <Text>{card.question}</Text>
          </TouchableOpacity>
        </View>       
      ))}
    </ScrollView>
    </View>
      );
};

const styles = StyleSheet.create({
  cardsAllContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardListItem: {
    width: "45%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 5,
  },
});