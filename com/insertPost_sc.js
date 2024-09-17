import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from 'react-native';
export default InsertPostScreen = () => {
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
                title="Insert Post Data"
                onPress={() => {
                    var datap = new FormData();
                    datap.append("user_id", user_id);
                    datap.append("user_name", user_name);
                    datap.append("passwd", passwd);

                    fetch('http://172.21.12.190/mobileapp/wowwow2.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: datap,
                    })
                    .then(response => response.json())
                    .then(data => console.log(data)) // Fixed the typo here
                }}
            />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})