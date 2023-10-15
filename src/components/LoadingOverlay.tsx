import { View, Spinner, Text } from "native-base";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const LoadingOverlay = ({ message = null }) => {
  return (
    <View style={[styles.container]}>
      {message && <Text style={styles.message}>{message}</Text>}
      <Spinner color="indigo.500" size="sm" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 320,
    padding: 16,
    height: height,
    width: "100%",
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
