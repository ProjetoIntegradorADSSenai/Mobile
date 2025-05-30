import { Text, View, StyleSheet } from 'react-native';
import ChartTest from '@/components/Charts';
import TableChart from '@/components/TableChart';
import Charts from '@/components/Charts';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Charts />
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
