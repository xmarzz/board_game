import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Chessboard from './Chessboard'

export default function App() {
  return (
    <View style={styles.container}>
      <Chessboard/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

