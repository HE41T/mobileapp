import React, { Component } from "react";
import { Button, View, Text } from "react-native";
export default function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Screen</Text>
      <Text>นายนฏกร ศิริพิน</Text>
      <Text>ปี3 รหัส 1651010541202</Text>
    </View>
  );
}