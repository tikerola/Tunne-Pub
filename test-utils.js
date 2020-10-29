import React from "react";
import { NavigationContext } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CARD_DATA from "./data/cards";
import NEEDS_DATA from "./data/needs";
import { SENTENCES_DATA } from "./data/sentences";
import WORD_DATA from "./data/words";

const INITIAL_STATE = {
  cards: {
    // cards: CARD_DATA,
    // words: WORD_DATA,
    // needs: NEEDS_DATA,
    // sentences: SENTENCES_DATA,
    activeSummaryItemId: "123",
    summaryOfChosenItems: {
      123: {
        id: "123",
        name: "",
        cards: [],
        feelingsWords: [],
        feelingsYouMissWords: [],
        needs: ["hei"],
        needsBehindAFeeling: [],
        sentences: [],
        questions: {},
        itemSaved: true,
      },
    },
    screenNumber: 1,
    numOfItems: 0,
    initialLoadFinished: false,
  },
};

const mockStore = configureStore([]);
const store = mockStore(INITIAL_STATE);

const navContext = {
  isFocused: () => true,
  // addListener returns an unscubscribe function.
  addListener: jest.fn(() => jest.fn()),
};

const reduxRender = (ui, options, storeData = store) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider store={storeData}>
        <NavigationContext.Provider value={navContext}>
          {children}
        </NavigationContext.Provider>
      </Provider>
    ),
    ...options,
  });

// re-export everything for convenience
export * from "@testing-library/react-native";

// override render method
export { reduxRender as render, store };
