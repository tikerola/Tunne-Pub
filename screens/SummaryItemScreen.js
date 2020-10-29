import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RenderSummary } from "../components/RenderSummary";
import { colors } from "../constants/colors";

export default function SummaryItemScreen({ route, navigation }) {
  const { summaryItemId } =
    route && route.params ? route.params : { summaryItemId: undefined };

  const item = useSelector((state) =>
    summaryItemId
      ? state.cards.summaryOfChosenItems[summaryItemId]
      : state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId]
  );

  const dispatch = useDispatch();

  if (
    !item ||
    (Object.keys(item.questions).length === 0 && item.cards.length === 0)
  )
    return (
      <View style={styles.emptyView}>
        <Text style={styles.text}>Et ole vielä tallentanut mitään</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <RenderSummary
          item={item}
          dispatch={dispatch}
          enableEdit={!!summaryItemId}
          navigation={navigation}
        />
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

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bodyBg,
  },
  text: {
    color: "#bbb",
  },
});
