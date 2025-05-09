import { Text, View,  StyleSheet} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});