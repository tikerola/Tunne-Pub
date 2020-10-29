import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  title,
  onPress,
  color
}) {
  const styles = stylesFactory(color);

  return (
    <TouchableOpacity testID="button" onPress={onPress} style={styles.buttonContainer}>
      <Text testID="title" style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const stylesFactory = (color) =>
  StyleSheet.create({
    buttonContainer: {
      width: 100,
      backgroundColor: color ? color : "#3a89ed",
      padding: 5,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.44,
      shadowRadius: 5,
      elevation: 5,
      margin: 0,
      borderRadius: 5,
    },

    buttonText: {
      color: "white",
      fontSize: 16,
      alignSelf: "center",
      fontFamily: "Roboto-Light",
    },
  });
