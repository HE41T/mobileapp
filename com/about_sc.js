import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Me</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>นายนฏกร ศิริพิน</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Year:</Text>
        <Text style={styles.info}>ปี 3</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Student ID:</Text>
        <Text style={styles.info}>1651010541202</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Light background color
    padding: 40,
    alignItems:"center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 12,
    width: "100%", // Full width for the info container
    alignItems:"center",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF", // Color for labels
    marginRight: 10, // Space between label and info
    
  },
  info: {
    fontSize: 20,
    color: "#555", // Color for info text
    
  },
});
