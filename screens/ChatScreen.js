import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Chatscreen = () => {
  return (
    <View style={styles.container}>
      <Text>Chatscreen</Text>
    </View>
  );
};

export default Chatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
