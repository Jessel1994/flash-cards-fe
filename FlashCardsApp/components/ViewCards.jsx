import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getCards } from "../api";
import { UserContext } from "../contexts/Theme";

export const ViewCards = ({ route, navigation }) => {
  console.log("Route Params:", route.params);
  const { user } = useContext(UserContext);
  const { topic } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCards(topic)
      .then((cards) => {
        setIsLoading(false);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [topic]);

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

  if (cards.length === 0) {
    return (
      <View>
        <Text>No Cards Found on this Topic</Text>
      </View>
    );
  }
  // console.log('Rendered Cards:', cards); // Log the cards being rendered#

  return (
    <View style={styles.cardsAllContainer}>
      <ScrollView>
        {cards.map((card) => {
          {
            /* if (card.author !== user) { */
          }
          return (
            <View style={styles.cardListItem} key={card._id}>
              <TouchableOpacity
                key={card._id}
                onPress={() => {
                  navigation.navigate("Card", { card_id: card._id });
                }}
              >
                <Text>{card.question}</Text>
              </TouchableOpacity>
            </View>
          );
          {
            /* } */
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsAllContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  cardListItem: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    width: 400,
  },
});
