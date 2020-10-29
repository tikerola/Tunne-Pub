import React from "react";
import { useFonts } from "@expo-google-fonts/inter";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import AppNavigator from "./navigation/AppNavigator";
import cardsReducer from "./store/reducers/cards";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  cards: cardsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/NotoSerif-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/NotoSerif-Bold.ttf"),
    "Segoe-Print": require("./assets/fonts/Segoe-Print.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
