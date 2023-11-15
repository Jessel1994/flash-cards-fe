// TopicCard.js
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import EditTopic from './EditTopic';

const TopicCard = ({ topic, onPressHandler, setUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => onPressHandler(topic)}
        onLongPress={() => setModalVisible(true)}>
        <View key={topic.slug} style={styles.card}>
          <Text style={styles.title}>{topic.name}</Text>
          <Text style={styles.count}>Cards: {topic.countCards}</Text>
        </View>
      </Pressable>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit or delete topic</Text>
            <Text style={{}}>{topic.name}</Text>
            <EditTopic
              topic={topic}
              setModalVisible={setModalVisible}
              setUpdate={setUpdate}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    width: 150,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  count: {
    fontSize: 16,
    color: 'dimgray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TopicCard;
