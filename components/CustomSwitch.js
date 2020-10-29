import React from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-switch";

export default function CustomSwitch({ listMode, setListMode }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "#bbb", alignSelf: "center", marginRight: 12 }}>
        Moodi:{" "}
      </Text>
      <Switch
        testID="switch"
        value={listMode}
        onValueChange={(val) => setListMode(val)}
        activeText={"Lista"}
        inActiveText={"Oma"}
        switchLeftPx={3}
        switchRightPx={3}
        circleActiveColor={"#30a566"}
      />
    </View>
  );
}
