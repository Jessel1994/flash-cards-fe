import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TouchableHighlight,
} from 'react-native';
import { getCards, deleteCard, resetAllCardsIsCorrect } from '../api';
import { UserContext } from '../contexts/Theme';

export const ViewCards = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { topic } = route.params || {};
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCards() {
      await getCards(user.username, topic.name)
        .then((cards) => {
          setIsLoading(false);
          setCards(cards);
        })
        .catch((error) => {
          setError(error);
        });
    }
    fetchCards();
  }, [topic, resetting, isCorrect]);

  const handleBack = (index) => {
    const card_id = cards[index - 1]._id;
    openSingle(card_id, index - 1);
  };

  const handleNext = (index) => {
    const card_id = cards[index + 1]._id;
    openSingle(card_id, index + 1);
  };

  const openSingle = (card_id, index) => {
    navigation.navigate('Card', {
      card_id: card_id,
      handleNext: handleNext,
      index: index,
      handleBack: handleBack,
      setIsCorrect: setIsCorrect,
    });
  };

  const handleSubmit = (card_id) => {
    alert('Card deleted');
    setIsDeleting(true);
    setCards((currCards) => {
      return currCards.filter((card) => card._id !== card_id);
    });
    deleteCard(card_id)
      .then(() => {
        setIsDeleting(false);
        setDeletingCard(null);
      })
      .catch((error) => {
        setCards((currCards) => [...currCards]);
        setIsDeleting(false);
        setDeletingCard(null);
      });
  };

  // RESETTING CARDS
  const handleReset = async () => {
    try {
      await resetAllCardsIsCorrect(user.username, topic);
      // setCards((prevCards) => prevCards.map((card) => ({ ...card, isCorrect: -1 })));
      const updatedCards = await getCards(user.username, topic);
      // setCards(updatedCards);
      setResetting((value) => !value);
      // setCardAssessed(false)
    } catch (error) {
      console.error('Error resetting cards:', error);
      setError(error);
      setResetting(false);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text style={styles.pageUpdates}>loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={styles.pageUpdates}>No Results Found</Text>
        <View style={{ padding: 12 }}>
          <Button
            title={'Add card'}
            style={{ padding: 8 }}
            onPress={() => {
              navigation.navigate('Create Card', { topic: topic.name });
            }}
          />
        </View>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View>
        <Text style={styles.pageUpdates}>No Cards Found on this Topic</Text>
        <View style={{ padding: 12 }}>
          <Button
            title={'Add card'}
            style={{ padding: 8 }}
            onPress={() => {
              navigation.navigate('Create Card', { topic: topic.name });
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cardsAllContainer}>
      <TouchableHighlight onPress={() => handleReset()}>
        <View style={styles.resetter}>
          <Text>Touch Here to Reset</Text>
        </View>
      </TouchableHighlight>
      <ScrollView>
        {cards.map((card, index) => (
          <View style={styles.cardListItem} key={card._id}>
            <TouchableOpacity
              key={card._id}
              onPress={() => openSingle(card._id, index)}>
              <Text>{card.question}</Text>
            </TouchableOpacity>
            <View style={styles.deleteButton}>
              <Button
                title='Delete'
                color='red'
                onPress={() => {
                  handleSubmit(card._id);
                }}
              />
            </View>
            {/* style to distinguish for correct or incorrect answer*/}

            {card.isCorrect === -1 ? null : (
              <Text style={{ color: card.isCorrect ? 'green' : 'coral' }}>
                {card.isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={{ padding: 12 }}>
        <Button
          title={'Add card'}
          style={{ padding: 8 }}
          onPress={() => {
            navigation.navigate('Create Card', { topic: topic.name });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsAllContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  resetter: {
    margin: 'auto',
    height: 40,
    backgroundColor: 'lightgreen',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  cardListItem: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    width: 350,
    height: 150,
  },
  deleteButton: {
    borderRadius: 100,
    position: 'absolute',
    bottom: '16px',
    flex: 1,
    right: 10,
  },
  pageUpdates: {
    backgroundColor: 'skyblue',
    marginTop: '50px',
    textAlign: 'center',
    padding: '16px',
    // fontSize: '32px',
  },
});
