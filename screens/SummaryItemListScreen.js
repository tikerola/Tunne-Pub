import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { setActiveSummaryItemId } from "../store/actions/cards";

export default function SummaryItemListScreen({ navigation }) {
  const dispatch = useDispatch();

  const summaryToAnArray = (items) => {
    const arr = [];

    for (let i in items) {
      if (items[i].itemSaved) arr.push(items[i]);
    }

    return arr;
  };

  const summaryItemsArray = useSelector((state) =>
    summaryToAnArray(state.cards.summaryOfChosenItems)
  );
  const item = useSelector(
    (state) => state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId]
  );
  const initialLoadFinished = (state) => state.cards.initialLoadFinished;

  useFocusEffect(
    React.useCallback(() => {
      if (item && item.itemSaved) {
        dispatch(setActiveSummaryItemId(""));
      }
    }, [item])
  );

  const renderList = summaryItemsArray.map((item) => {
    return (
      <TouchableOpacity
        key={item.name}
        onPress={() =>
          navigation.navigate("SummaryItem", { summaryItemId: item.id })
        }
      >
        <View style={styles.listContainer}>
          {item.itemSaved && <Text style={styles.name}>{item.name}</Text>}
        </View>
      </TouchableOpacity>
    );
  });

  /* if (!initialLoadFinished)
    return <View style={styles.emptyView}>
      <ActivityIndicator size="large" />
    </View> */

  if (!summaryItemsArray.length)
    return (
      <View style={styles.emptyView}>
        <Text style={{ color: "#bbb" }}>Ei tallennettuja istuntoja</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>TALLENNETUT ISTUNNOT</Text>
        {renderList}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bodyBg,
  },

  listContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    padding: 7,
  },

  container: {
    flex: 1,
    backgroundColor: colors.bodyBg,
  },

  title: {
    marginTop: 15,
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 20,
    fontVariant: ["small-caps"],
    color: "#bbb",
  },

  number: {
    fontSize: 18,
    color: "#777",
  },

  name: {
    fontSize: 20,
    color: "white",

    //textDecorationLine: 'underline'
  },
  listButtonText: {
    fontSize: 20,
    color: "#3a89ed",
    //borderRadius: 5,
    // padding: 4,
    textDecorationLine: "underline",
    //backgroundColor: 'black'
  },
});
