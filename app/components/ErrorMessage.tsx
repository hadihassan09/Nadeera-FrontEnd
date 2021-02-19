  
import React from "react";
import { StyleSheet, Platform, Text } from "react-native";


function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
  error: {
    color: "#ff0000",
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default ErrorMessage;