import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { colors } from "../constants/colors";
import CustomButton from "./CustomButton";

export default function ProgressImageStepContent({
  navigation,
  navigateTo,
  data,
  handleSubmit,
  pad = false,
}) {
  return (
    <View style={pad && styles.pad}>
      <Text style={styles.instructionText}>
        Hyvä! Valitse nyt{" "}
        <Text
          style={styles.listButtonText}
          onPress={() => navigation.navigate(navigateTo)}
        >
          tunnekuvista
        </Text>
        <Text style={styles.instructionText}>
          {" "}
          ne kuvat, jotka parhaiten kuvaavat tunteitasi.
        </Text>
      </Text>
      <FlatList
        style={[styles.flatlist, { marginTop: 15, marginBottom: 20 }]}
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <Image testID="image" style={styles.image} source={item.filename} />
          );
        }}
      />
      {data.length > 0 && (
        <CustomButton
          title="Tallenna"
          onPress={() => handleSubmit("dummy text")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listButtonText: {
    fontSize: 20,
    color: "#3a89ed",
    textDecorationLine: "underline",
  },

  flatlist: {
    marginTop: 0,
    marginBottom: 0,
    width: "90%",
    alignSelf: "center",
  },

  flatlistItem: {
    fontSize: 20,
    margin: 5,
    color: "red",
    fontFamily: "Segoe-Print",
  },

  instructionText: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "Roboto-Light",
    color: "#bbb",
  },
  pad: {
    backgroundColor: colors.stepperContentBg,
    padding: 50,
    borderRadius: 10,
  },
  image: {
    width: 96,
    height: 140,
    marginRight: 5,
  },
});
