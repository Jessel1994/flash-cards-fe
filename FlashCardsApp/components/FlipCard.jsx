import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

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
          <Text>1 + 1</Text>
        </View>
        {/* Back Side */}
        <View style={[styles.back, styles.cardSide]}>
          <Text>2</Text>
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
