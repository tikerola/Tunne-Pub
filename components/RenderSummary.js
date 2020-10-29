import React, { useState } from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  deleteSummaryItem,
  setActiveSummaryItemId,
  setScreenNumber,
} from "../store/actions/cards";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import CustomButton from "./CustomButton";
import DeleteModal from "./DeleteModal";

export const RenderSummary = ({
  item,
  dispatch,
  enableEdit = false,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const summaryItems = useSelector((state) => state.cards.summaryOfChosenItems);

  const handleDelete = async () => {
    navigation.goBack();
    dispatch(deleteSummaryItem(deleteId));
    const items = { ...summaryItems };
    delete items[deleteId];

    try {
      AsyncStorage.setItem("items", JSON.stringify(items));
    } catch (err) {
      console.log("poisto epäonnistui");
    }
  };

  const itemQuestionsToArray = React.useCallback(() => {
    const arr = [];

    for (let i in item.questions) {
      arr.push({ [i]: item.questions[i] });
    }

    return arr;
  }, [item]);

  const handleEdit = () => {
    dispatch(setActiveSummaryItemId(item.id));
    navigation.navigate("MainScreen", { name: summaryItems[item.id].name });
    dispatch(setScreenNumber(41));
  };

  const toggleModal = () => setModalVisible((prevState) => !prevState);

  if (!item) return null;

  if (modalVisible)
    return (
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleDelete={handleDelete}
        toggleModal={toggleModal}
      />
    );

  return (
    <ScrollView contentContainerStyle={styles.itemContainer}>
      <FlatList
        horizontal
        data={item.cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={item.filename} />;
        }}
      />

      <View>
        {itemQuestionsToArray().map((q, index) => {
          if (Object.values(q)[0] === "") return;

          return (
            <View style={styles.questionsContainer} key={index}>
              <Text
                style={{
                  color: "#bbb",
                  fontSize: 18,
                  fontFamily: "Roboto-Light",
                }}
              >
                <Text style={styles.bold}>{Object.keys(q)[0]}: </Text>
                {Object.values(q)[0]}
              </Text>
            </View>
          );
        })}
      </View>
      {enableEdit && (
        <View style={styles.imageAndWordsContainer}>
          <View style={styles.wordAndButtonContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton title="Muokkaa" onPress={handleEdit} />
              <CustomButton
                title="Poista"
                onPress={() => {
                  setDeleteId(item.id);
                  toggleModal();
                }}
                color="red"
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 15,
  },

  imageAndWordsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },

  wordAndButtonContainer: {
    marginLeft: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 5,
  },

  image: {
    width: 96,
    height: 140,
    marginLeft: 5,
    marginRight: 5,
  },

  buttonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "75%",
    alignSelf: "center",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  questionsContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
  },

  bold: {
    fontWeight: "bold",
    color: "#666",
  },
});
