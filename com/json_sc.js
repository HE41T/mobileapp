import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from 'react-native';

export default function JsonScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to control editing
  const [id, onChangeid] = useState('');
  const [user_id, onChangeUid] = useState('');
  const [user_name, onChangeUname] = useState('');
  const [passwd, onChangePwd] = useState('');

  useEffect(() => {
    fetch('http://192.168.3.164/mobileapp/getjson.php')
      .then((response) => response.json())
      .then((json) => {
        console.log('Data received:', json);
        setData(json);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (item) => {
    onChangeid(item.id);
    onChangeUid(item.user_id);
    onChangeUname(item.user_name);
    onChangePwd(item.passwd);
    setSelectedId(item.id);
    setIsEditing(true); // Set editing state to true
  };

  const handleUpdate = () => {
    if (!selectedId) {
      Alert.alert('Error', 'No User selected for editing');
      return;
    }

    fetch(`http://192.168.3.164/mobileapp/update.php?id=${selectedId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        user_name,
        passwd,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          Alert.alert('Success', 'User updated successfully');
          setData((prevData) => 
            prevData.map((item) => 
              item.id === selectedId 
                ? { ...item, user_id, user_name, passwd } 
                : item
            )
          );
          // Reset fields and states
          resetForm();
        } else {
          Alert.alert('Error', `Failed to update the User`);
        }
      })
      .catch((error) => {
        console.error('Error updating User:', error);
        Alert.alert('Error', 'An error occurred while updating the User');
      });
  };

  const resetForm = () => {
    onChangeid('');
    onChangeUid('');
    onChangeUname('');
    onChangePwd('');
    setSelectedId(null);
    setIsEditing(false); // Reset editing state
  };

  const handleDelete = (id) => {
    fetch(`http://192.168.3.164/mobileapp/delete.php?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          Alert.alert('User deleted successfully');
          setData(data.filter((item) => item.id !== id));
          
          resetForm();
        } else {
          Alert.alert(`Failed to delete the User: ${json.message}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting User:', error);
        Alert.alert('An error occurred while deleting the User');
      });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this User?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {message ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'red', fontSize: 16 }}>{message}</Text>
        </View>
      ) : null}

      {/* Display input fields if an item is selected for editing */}
      {selectedId && isEditing && (
        <View>
          <Text style={{ fontSize: 20, paddingBottom:10}}>
            ID: {id || "N/A"}  {/* Display "N/A" if id is empty */}
          </Text>

          <TextInput
            placeholder="User ID"
            value={user_id}
            onChangeText={onChangeUid}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize:16 }}
          />
          <TextInput
            placeholder="User Name"
            value={user_name}
            onChangeText={onChangeUname}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize:16 }}
          />
          <TextInput
            placeholder="Password"
            value={passwd}
            onChangeText={onChangePwd}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize:16 }}
            //secureTextEntry
          />
          <Button
            title="Update Item" 
            onPress={handleUpdate} 
          />
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style = {style.headers}>ID: {item.id}</Text>
              <Text style = {style.info}>User ID: {item.user_id}</Text>
              <Text style = {style.info}>User Name: {item.user_name}</Text>
              <Text style = {style.info}>Password: {item.passwd}</Text>
            </TouchableOpacity>
            {selectedId !== item.id && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Button title="     Delete     " onPress={() => confirmDelete(item.id)} color="red" />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
    headers:{
      fontSize:18,
    },
    info:{
      fontSize:16,
    },
})
