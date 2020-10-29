import React from "react";
import { StyleSheet, View, Text, TextInput, Modal } from "react-native";
import { colors } from "../constants/colors";
import CustomButton from "./CustomButton";

export default function CustomQueryNameModal({
  navigation,
  modalVisible,
  setModalVisible,
  summaryItemName,
  error,
  setSummaryItemName,
  handleModalPress,
  pad = false,
}) {
  return (
    <View testID="modal-container" style={styles.modalContainer}>
      <Modal
        transparent={true}
        animationType="fade"
        hardwareAccelerated
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          navigation.navigate("Ohjeet");
        }}
      >
        <View style={styles.modalContentContainer}>
          <View style={{ alignSelf: "center", width: pad ? "65%" : "100%" }}>
            <View>
              <Text testID="modal-title" style={styles.descText}>
                Aloita antamalla istunnolle nimi
              </Text>
              <TextInput
                testID="input"
                style={styles.textInput}
                onChangeText={(text) => setSummaryItemName(text)}
                value={summaryItemName}
              />
              <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton title="Tallenna" onPress={handleModalPress} />
              <CustomButton
                title="Peruuta"
                onPress={() => handleModalPress("peruuta")}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.bodyBg,
  },

  modalContentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 25,
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,

    elevation: 5,
  },

  textInput: {
    borderWidth: 1,
    backgroundColor: "#555",
    borderRadius: 5,
    padding: 5,
    borderColor: "#bbb",
    color: "white",
  },
  descText: {
    fontSize: 18,
    fontFamily: "Roboto-Light",
    color: "white",
    marginBottom: 5,
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
  buttonContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
