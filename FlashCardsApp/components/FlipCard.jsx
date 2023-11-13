import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet, Pressable} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getSingleCard, updateCardIsCorrect } from '../api';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const route = useRoute();
  const { card_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [singleCard, setSingleCard] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getSingleCard(card_id)
    .then((card) => {
      console.log(card)
      setIsLoading(false);
      setSingleCard(card);
    })
    .catch((error) => {});

    setIsCorrect(singleCard?.isCorrect || false);
  }, [card_id, singleCard?.isCorrect]);


  const handleCorrectPress = async () => {
    try {
      const updatedCard = await updateCardIsCorrect(card_id, singleCard.answer, singleCard.topic, true);
      setIsCorrect(true);
    console.log('Card marked as correct:', updatedCard);
    } catch (error) {
      console.error('Error marking card as correct:', error);
    }
  };

  const handleIncorrectPress = () => {
    setIsCorrect(false);
    console.log('Card marked as incorrect');
  };

  if (isLoading) {
    return (
      <View>
      <Text style={styles.pageUpdates}>loading...</Text>
      </View>
      )
    }



  return (
    <View style={styles.container}>
    {singleCard? (
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
        <Text style = {styles.cardtext}>
          {isFlipped ? singleCard.answer : singleCard.question}
          </Text>
        </View>
        {/* Back Side */}
        
        <View style={[styles.back, styles.cardSide]}>
        
          <Text style = {styles.cardtext}>
          {isFlipped ? singleCard.question : singleCard.answer }
          </Text>
        
            <View style={styles.buttonsContainer}> 
            <Pressable
              onPress={() => {handleCorrectPress();
              }}
              style={({ pressed }) => [
                styles.correctBtn,
                {
                  backgroundColor: pressed ? 'darkgreen' : '#228b22',
                },
              ]}
            >
              <Text style={styles.buttonText}>Correct Answer</Text>
            </Pressable>

            <Pressable
              onPress={() => {handleIncorrectPress();
              }}
              style={({ pressed }) => [
                styles.incorrectBtn,
                {backgroundColor: pressed ? 'darkred' : '#ff7f50',
                },
              ]}
            >
              <Text style={styles.buttonText}>Incorrect Answer</Text>
            </Pressable>
            </View>

            </View>      
      </FlipCard>
    ) : (
      <Text style={styles.pageUpdates}>loading...</Text>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '75%',
    height: '300px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '200px',
    marginTop: '30px',
    // alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    borderRadius: 20,
  },
  cardSide: {
  
    width: '500px',
    height: '50%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  face: {
    width: '90%',
  },
  back: {
    width: '90%',
  },
  cardtext: {
    padding: '16px',
    fontSize: '16px',
  },
  correctBtn: {
    backgroundColor: '#228b22',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    minWidth: '48%',
    textAlign: 'center',
  },
  incorrectBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    minWidth: '48%',
    backgroundColor: '#ff7f50', //'coral',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: '50px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '16px',
  }, 
  buttonText: {

  },
  pageUpdates: {
    backgroundColor: 'skyblue',
    marginTop: '50px',
    textAlign: 'center',
    padding: '16px',
    fontSize: '32px',


   },
});

export default Card;
