import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";

export default function HomeScreen({ navigation }) {
  const [time, setTime] = useState();
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // Loading state
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Function to fetch search results
  const fetchSearchResults = () => {
    setLoading(true); // Start loading
    fetch(`http://192.168.3.164/mobileapp/search.php?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json); // Update search results state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} // Update search query state
        onSubmitEditing={fetchSearchResults} // Fetch results when user submits
      />

      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.time}>{time}</Text>

      {/* Display search results */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text>ID: {item.id}</Text>
              <Text>User ID: {item.user_id}</Text>
              <Text>User Name: {item.user_name}</Text>
              <Text>Password: {item.passwd}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Json")}>
        <Text style={styles.buttonText}>Go to Json</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InsertGet")}>
        <Text style={styles.buttonText}>Go to Get Insert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InsertPost")}>
        <Text style={styles.buttonText}>Go to Post Insert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")}>
        <Text style={styles.buttonText}>Go to About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  time: {
    fontSize: 20,
    marginBottom: 20,
    color: "#555",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  resultItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  }
});