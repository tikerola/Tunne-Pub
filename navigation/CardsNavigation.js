import { Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/colors";
import HelpScreen from "../screens/HelpScreen";
import ImageScreen from "../screens/ImageScreen";
import MainScreen from "../screens/MainScreen";
import SecondScreen from "../screens/SecondScreen";
import SummaryItemListScreen from "../screens/SummaryItemListScreen";
import SummaryItemScreen from "../screens/SummaryItemScreen";
import ThankScreen from "../screens/ThankScreen";
import ThirdScreen from "../screens/ThirdScreen";
import WordScreen from "../screens/WordScreen";

const CardsStackNavigator = createStackNavigator();

const config = {
  animation: "timing",
  config: {
    stiffness: 2000,
    damping: 100,
    mass: 7,
    overshootClamping: true,
    restDisplacementThreshold: 0.05,
    restSpeedThreshold: 0.05,
  },
};

const defaultCardsScreenOptions = ({ navigation }) => ({
  headerTitle: "TUNNE-APP",
  headerStyle: { backgroundColor: colors.headerBg },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "Roboto-Bold",
    letterSpacing: 2,
  },
  headerRight: (props) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("SummaryItemScreen")}
    >
      <Ionicons
        style={styles.headerRightContainer}
        name={"md-clipboard"}
        size={24}
        color={"white"}
      />
    </TouchableOpacity>
  ),
});

const defaultHelpScreenOptions = ({ navigation }) => ({
  headerTitle: "TUNNE-APP",
  headerStyle: { backgroundColor: colors.headerBg },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "Roboto-Bold",
    letterSpacing: 2,
  },
});

export const CardsNavigator = ({ navigation }) => {
  return (
    <CardsStackNavigator.Navigator screenOptions={defaultCardsScreenOptions}>
      <CardsStackNavigator.Screen name="MainScreen" component={MainScreen} />
      <CardsStackNavigator.Screen
        name="SummaryItemScreen"
        component={SummaryItemScreen}
        options={{
          headerTitle: "YHTEENVETO",
        }}
      />
      <CardsStackNavigator.Screen
        name="SummaryItemListScreen"
        component={SummaryItemListScreen}
        options={{
          headerTitle: "YHTEENVETO",
        }}
      />
      <CardsStackNavigator.Screen
        name="WordScreen"
        component={WordScreen}
        options={{
          headerTitle: "VALITSE SANOJA",
        }}
      />
      <CardsStackNavigator.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={{
          headerTitle: "VALITSE KUVIA",
        }}
      />

      <CardsStackNavigator.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}
      />
      <CardsStackNavigator.Screen
        name="ThirdScreen"
        component={ThirdScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}
      />

      <CardsStackNavigator.Screen
        name="ThankScreen"
        component={ThankScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          headerRight: null,
          headerLeft: null,
        }}
      />
    </CardsStackNavigator.Navigator>
  );
};

const HelpStackNavigator = createStackNavigator();

const HelpNavigator = ({ navigation }) => {
  return (
    <HelpStackNavigator.Navigator screenOptions={defaultHelpScreenOptions}>
      <HelpStackNavigator.Screen
        name="Ohjeet"
        component={HelpScreen}
        options={{
          headerTitle: "OHJEET V1.2",
        }}
      />
    </HelpStackNavigator.Navigator>
  );
};

const SummaryStackNavigator = createStackNavigator();

const SummaryNavigator = ({ navigation }) => {
  return (
    <SummaryStackNavigator.Navigator
      screenOptions={defaultHelpScreenOptions}
      initialRouteName="SummaryList"
    >
      <SummaryStackNavigator.Screen
        name="SummaryList"
        component={SummaryItemListScreen}
        options={{
          headerTitle: "YHTEENVETO",
        }}
      />
      <SummaryStackNavigator.Screen
        name="SummaryItem"
        component={SummaryItemScreen}
        options={{
          headerTitle: "YHTEENVETO",
        }}
      />
    </SummaryStackNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      lazy={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Ohjeet") {
            iconName = focused ? "help" : "help";
          } else if (route.name === "Tunne") {
            iconName = focused ? "new-message" : "new-message";
          } else if (route.name === "Tallennetut") {
            iconName = focused ? "save" : "save";
          }

          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.activeTab,
        inactiveTintColor: "gray",
        activeBackgroundColor: "black",
        inactiveBackgroundColor: "black",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Ohjeet" component={HelpNavigator} />
      <Tab.Screen
        name="Tunne"
        component={CardsNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("MainScreen");
          },
        })}
      />
      <Tab.Screen
        name="Tallennetut"
        component={SummaryNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("SummaryList");
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  headerRightContainer: {
    marginRight: 20,
  },
});
