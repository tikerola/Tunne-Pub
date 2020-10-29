import React from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import CustomSwitch from "./CustomSwitch";
import CustomTextInput from "./CustomTextInput";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";
import { setScreenNumber } from "../store/actions/cards";

const ProgressModeStepContent = ({
  navigation,
  navigateTo,
  navigateBackTo,
  wordType,
  question,
  listMode,
  setListMode,
  error,
  handleSubmit,
  description,
  answer,
  setAnswer,
  pad = false,
}) => {
  const dispatch = useDispatch();

  return (
    <View style={pad && styles.pad}>
      <TouchableHighlight
        onPress={() => {
          dispatch(setScreenNumber(5));
          navigation.navigate(navigateTo, {
            wordType,
            navigateBackTo,
            question,
          });
        }}
      >
        <CustomTextInput
          editable={listMode ? false : true}
          placeholder={
            listMode
              ? wordType === "sentences"
                ? "Paina minua lisätäksesi lauseita lauselistasta..."
                : "Paina minua lisätäksesi sanoja sanalistasta..."
              : undefined
          }
          description={description}
          value={answer}
          handleChange={setAnswer}
        />
      </TouchableHighlight>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Tallenna"
          onPress={() => handleSubmit(answer, wordType)}
          touchable={true}
        />
        <CustomSwitch listMode={listMode} setListMode={setListMode} />
      </View>
    </View>
  );
};

export default ProgressModeStepContent;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  error: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: "red",
  },
  pad: {
    backgroundColor: colors.stepperContentBg,
    padding: 50,
    borderRadius: 10,
  },
});
