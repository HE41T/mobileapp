import React from "react"; 
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from 'react-native'; 
export default InsertScreen = () => { 
    const [isLoading, setLoading] = React.useState(true);
    const [user_id, onChangeUid] = React.useState('');
    const [user_name, onChangeUname] = React.useState('');
    const [passwd, onChangPwd] = React.useState('');
    const [data, setData] = React.useState([]);

    return ( 
        <SafeAreaView> 
            <Text>User Id</Text> 
            <TextInput 
                style={style.input} 
                onChangeText={onChangeUid} 
                value={user_id} 
            /> 
            <Text>User Name</Text> 
            <TextInput 
                style={style.input} 
                onChangeText={onChangeUname} 
                value={user_name} 
            /> 
            <Text>Password</Text> 
            <TextInput 
                style={style.input} 
                onChangeText={onChangPwd} 
                value={passwd} 
            /> 
            <Button 
                title="Insert Data" 
                onPress={() => { 
                    fetch('http://172.21.12.190/mobileapp/wowwow.php?user_id='+ user_id +'&user_name='+ user_name +'&passwd='+ passwd) 
                        .then((response) => response.json()) 
                        .then((json) => setData(json)) 
                        .catch((error) => console.error(error)) 
                        .finally(() => setLoading(false)); 
                    }}       
                /> 
            </SafeAreaView> 
    ); 
}; 
const style = StyleSheet.create({ 
    input:{ 
        height: 40, 
        margin: 12, 
        borderWidth: 1, 
        padding: 1, 
    } 
})