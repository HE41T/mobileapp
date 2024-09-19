import React from "react"; 
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View } from 'react-native';
export default InsertScreen = () => { 
    const [isLoading, setLoading] = React.useState(true);
    const [user_id, onChangeUid] = React.useState('');
    const [user_name, onChangeUname] = React.useState('');
    const [passwd, onChangPwd] = React.useState('');
    const [data, setData] = React.useState([]);

    return ( 
        <SafeAreaView> 
            <Text style={style.Text}>User ID</Text>
            <TextInput
                style={style.input}
                onChangeText={onChangeUid}
                value={user_id}
            />
            <Text style={style.Text}>User Name</Text>
            <TextInput
                style={style.input}
                onChangeText={onChangeUname}
                value={user_name}
            />
            <Text style={style.Text}>Password</Text>
            <TextInput
                style={style.input}
                onChangeText={onChangPwd}
                value={passwd}
            />
            <View style={{ margin: 10 }}>
            <Button 
                title ="Insert Get Data"  
                onPress={() => { 
                    fetch('http://192.168.3.164/mobileapp/insertget.php?user_id='+ user_id +'&user_name='+ user_name +'&passwd='+ passwd) 
                        .then((response) => response.json()) 
                        .then((json) => setData(json)) 
                        .catch((error) => console.error(error)) 
                        .finally(() => setLoading(false)); 
                    }}       
                /> 
            </View>
            </SafeAreaView> 
    ); 
}; 
const style = StyleSheet.create({ 
    input:{ 
        height: 40, 
        margin: 12, 
        borderWidth: 1, 
        padding: 1, 
    },
    Text:{
        fontSize: 18,
        paddingLeft: 12,
        paddingTop: 12,
    }
})