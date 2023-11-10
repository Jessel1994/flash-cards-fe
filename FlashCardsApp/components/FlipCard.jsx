import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getSingleCard } from '../api';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  // const card_id = "654b726c2f203df63a9f608f";

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

  }, [card_id]);

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
});

export default Card;
