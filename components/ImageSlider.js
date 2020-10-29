import React from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleChosenCard } from "../store/actions/cards";

export default function ImageSlider() {
  const allCards = useSelector((state) => state.cards.cards);
  const cards = useSelector(
    (state) =>
      state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId].cards
  );

  const dispatch = useDispatch();

  const toggleSelectedCards = (card) => {
    const cardExists = cards.find((c) => c.id === card.id);

    if (cardExists) {
      dispatch(toggleChosenCard(card, false));
    } else {
      dispatch(toggleChosenCard(card, true));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{ display: "flex", alignItems: "center" }}
        data={allCards}
        numColumns={3}
        extraData={cards}
        keyExtractor={(item) => item.id}
        initialNumToRender={15}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              toggleSelectedCards(item);
            }}
            style={[
              styles.imageContainer,
              cards.find((c) => c.id === item.id)
                ? styles.imageSelected
                : styles.imageNotSelected,
              cards.find((c) => c.id === item.id) && {
                transform: [
                  { scale: 1.5 },
                  { translateY: index > allCards.length - 2 ? -20 : 20 },
                ],
              },
            ]}
          >
            <View>
              <Image
                testID="image"
                style={styles.image}
                source={item.filename}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  flatlist: {
    width: "98%",
    height: Dimensions.get("screen").height * 0.5,
    paddingBottom: 0,
    paddingTop: 10,
    marginBottom: 5,
  },

  imageContainer: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
  },

  imageNotSelected: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 11,
  },

  imageSelected: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,

    elevation: 5,
    borderWidth: 1,
    borderColor: "red",
  },

  image: {
    width: 96,
    height: 140,
  },
});
