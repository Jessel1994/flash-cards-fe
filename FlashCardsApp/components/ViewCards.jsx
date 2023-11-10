import React, { useState, useEffect, useContext } from "react";
import {
  View, ScrollView, Text,
  StyleSheet, TouchableOpacity,
} from "react-native";
import { getCards } from "../api";
import { UserContext } from '../contexts/Theme';

export const ViewCards = ({navigation}) => {
  const {user} = useContext(UserContext)
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
      {cards.map((card) => {
        if (card.author === user) {
          return (
     
            <View style={styles.cardListItem} key={card._id}>
          
            <TouchableOpacity key={card._id} onPress={()=>{navigation.navigate('Card', {card_id: card._id})}}>
          <Text>{card.question}</Text>
          </TouchableOpacity>
        </View>       
      )
        }
      } )}
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
