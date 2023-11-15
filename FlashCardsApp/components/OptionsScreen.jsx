import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
 

export const OptionsScreen = ({ navigation, route }) => {
  useEffect (() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  const navigateToAllCards = () => {
    navigation.navigate('View Cards');
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title="Create Card"
      onPress={() => navigation.navigate('Add Card')}
      accessibilityLabel="Press to start creating your flash card"
      style={styles.createCardBtn}
    />
    {/* <Text style={{ margin: 10 }}>Card: {route.params?.post}</Text> */}

    <Button
        title="View Cards"
        onPress={navigateToAllCards}
        accessibilityLabel="Press to view your flash cards"
        style={styles.viewButton}
      />
  </View>
     )
  }

     const styles = StyleSheet.create({
        container: {
          width: 343,
          padding: 16,
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        },
              
        createCardBtn: {
          borderRadius: 10,
          backgroundColor: 'lightgrey',
        
        },
        viewButton: {
          borderRadius: 10,
          backgroundColor: 'lightgreen',
        }
      });
      