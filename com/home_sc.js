import React, { Component } from "react";
import { Button, View, Text } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Json"
        onPress={() => navigation.navigate("Json")}
      />  
      <Text>
        =============================================
      </Text>
      <Button
        title="Go to Clock"
        onPress={() => navigation.navigate("Clock")}
      />  
      <Text>
        =============================================
      </Text>
      <Button
        title="Go to Insert"
        onPress={() => navigation.navigate("Insert")}
      />  
      <Text>
        =============================================
      </Text>
      <Button
        title="Go to Post Insert"
        onPress={() => navigation.navigate("InsertPost")}
      />  
      <Text>
        =============================================
      </Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  );
};