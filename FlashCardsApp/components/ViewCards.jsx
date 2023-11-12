import React, { useState, useEffect, useContext } from "react";
import {
  View, ScrollView, Text,
  StyleSheet, TouchableOpacity, Button, Pressable
} from "react-native";
import { getCards , deleteCard} from "../api";
import { UserContext } from '../contexts/Theme';

export const ViewCards = ({navigation}) => {
  const {user} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null)

  const handleSubmit = (card_id) => {
    alert('Card deleted')
    if(user){
      setIsDeleting(true);
      setCards((currCards) => {
        return currCards.filter((card) => card._id !== card_id)
      });
      deleteCard(card_id)
      .then(() => {
        setIsDeleting(false)
        setDeletingCard(null)
      })
      .catch((error) => {
        setCards((currCards) => [...currCards])
        setIsDeleting(false)
        setDeletingCard(null)
      })
    }
    }


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
          <Button title="Delete" color="red" disabled ={isDeleting} onPress={()=>{handleSubmit(card._id)}} style={styles.deleteButton} />
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
  deleteButton: {
    borderRadius: 100,
  }
});
