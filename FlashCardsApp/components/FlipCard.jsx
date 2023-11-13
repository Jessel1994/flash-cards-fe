import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getSingleCard, updateCardIsCorrect } from '../api';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
   const route = useRoute();
  const { card_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [singleCard, setSingleCard] = useState();

  useEffect(() => {
    setIsLoading(true);
    getSingleCard(card_id)
    .then((card) => {
      // console.log(card)
      setIsLoading(false);
      setSingleCard(card);
    })
    .catch((error) => {});

    setIsCorrect(singleCard?.isCorrect || false);
  }, [card_id, singleCard?.isCorrect]);


  const handleCorrectPress = async () => {
    try {
      const updatedCard = await updateCardIsCorrect(card_id);
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
  <Text>loading...</Text>
  </View>
  )
    }



  return (
    <View style={styles.container}>
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
          <Text>
          {/* 1 + 1 */}
          {isFlipped ? singleCard.answer : singleCard.question}
          </Text>
        </View>
        {/* Back Side */}
        
        <View style={[styles.back, styles.cardSide]}>
        
          <Text>
          {isFlipped ? singleCard.question : singleCard.answer }
          </Text>
        </View>
      
        <View style={styles.buttonsContainer}>

        {/* Touchable opacity please */}
        <Button title = "Correct Answer"
           onPress={() =>{handleCorrectPress}} 
          accessibilityLabel="Press to asses yourself correct" 
          style={styles.correctBtn}>

          </Button>

          <Button title = "Incorrect Answer"
          onPress={() =>{handleIncorrectPress}} 
          accessibilityLabel="Press to asses yourself incorrect" 
          style={styles.incorrectBtn}>

          </Button>
          </View>
       
     
      
      </FlipCard>
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
    width: '300px',
    height: '200px',
    alignItems: 'center',
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
    width: '300px',
  },
  back: {
    width: '300px',
  },
  correctBtn: {
    backgroundColor: '#228b22',

  },
  incorrectBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: '48%',
    backgroundColor: '#ff7f50', //'coral',
    textAlign: 'center',
  },
  buttonsContainer: {
    // flex: 2,
    flexDirection: 'row',
    // marginTop: 40,
    // padding: 20,
   
    
  }
});

export default Card;
