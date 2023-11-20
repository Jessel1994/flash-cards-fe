import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { patchTopic, deleteTopic } from '../api';

export default function EditTopic({ topic, setModalVisible, setUpdate }) {
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    slug: topic.slug,
    name: topic.name,
  });
  const onChangeHandler = (text, id) => {
    setForm((val) => {
      const obj = { name: val.name, slug: val.slug };
      obj[id] = text;
      return obj;
    });
  };
  const buttonHandler = async () => {
    try {
      await patchTopic(form).then(() => {
        setForm({
          name: '',
          slug: '',
        });
        setModalVisible(false);
        setUpdate((val) => !val);
      });
    } catch (err) {
      setIsError(true);
    } finally {
    }
  };

  const deleteHandler = async function () {
    try {
      await deleteTopic(topic);
      setModalVisible(false);
      setUpdate((val) => !val);
    } catch {
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Topic name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter topic name'
          value={form.name}
          onChangeText={(text) => onChangeHandler(text, 'name')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Topic slug</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter topic slug'
          value={form.slug}
          onChangeText={(text) => onChangeHandler(text, 'slug')}
        />
      </View>
      {isError ? (
        <View style={{ backgroundColor: 'red' }}>
          <Text>SOME ERROR HAPPENED</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          title='Delete topic'
          onPress={() => deleteHandler()}
          style={{ backgroundColor: 'red' }}
        />
        <Button
          title='Save'
          onPress={buttonHandler}
          style={styles.signUpButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  signUpButton: {
    borderRadius: 100,
    backgroundColor: 'green',
    color: 'green',
  },
  signupText: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 8,
  },
});
