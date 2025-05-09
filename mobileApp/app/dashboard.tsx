import { Text, View, StyleSheet } from 'react-native';
import AppLineChart from '@/components/AppLineChart';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <AppLineChart/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    padding: 10
  },
  text: {
    color: '#fff',
  },
});
