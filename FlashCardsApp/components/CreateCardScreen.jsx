import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'



export const CreateCardScreen = ({ navigation, route }) => {
  useEffect (() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title="Create card"
      onPress={() => navigation.navigate('Add Card')}
      accessibilityLabel="Press to start creating your flash card"
      style={styles.saveButton}
    />
    <Text style={{ margin: 10 }}>Card: {route.params?.post}</Text>
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
        inputContainer: {
          width: "100%",
        },
        input: {
          width: "100%",
          height: 60,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: "10px",
          paddingHorizontal: 10,
        },
        saveButton: {
          borderRadius: 10,
          backgroundColor: "lightgreen",
        
        },
        delButton: {
          borderRadius: 10,
          backgroundColor: "red",
        },
      });
      