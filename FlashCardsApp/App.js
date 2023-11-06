import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUp';
import PostFlashCard from './components/PostFlashCard';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <SignUpForm />
      {/* <PostFlashCard /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
