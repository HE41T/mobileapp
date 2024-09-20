import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View } from 'react-native';
export default InsertPostScreen = () => {
    const [user_id, onChangeUid] = React.useState(''); // สถานะสำหรับ User ID
    const [user_name, onChangeUname] = React.useState(''); // สถานะสำหรับชื่อผู้ใช้
    const [passwd, onChangPwd] = React.useState(''); // สถานะสำหรับรหัสผ่าน
    // const [data, setData] = React.useState([]); // สถานะสำหรับเก็บข้อมูล (ถูกคอมเมนต์ไว้)

    return (
        <SafeAreaView >
            <Text style={style.Text}>User ID</Text>
            <TextInput
                style={style.input} // สไตล์สำหรับ TextInput
                onChangeText={onChangeUid} // ฟังก์ชันที่เรียกใช้เมื่อมีการเปลี่ยนแปลง
                value={user_id} // ค่าใน TextInput
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
                
                title="Insert Post Data" // ป้ายชื่อปุ่ม
                onPress={() => {
                    var datap = new FormData(); // สร้าง FormData เพื่อส่งข้อมูล
                    datap.append("user_id", user_id); // เพิ่ม User ID ใน FormData
                    datap.append("user_name", user_name); // เพิ่ม User Name ใน FormData
                    datap.append("passwd", passwd); // เพิ่ม Password ใน FormData

                    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
                    fetch('http://172.21.12.190/wow/insertpost.php', {
                        method: 'POST', // ใช้ POST สำหรับการส่งข้อมูล
                        headers: {
                            'Accept': 'application/json', // ยอมรับการตอบกลับเป็น JSON
                            'Content-Type': 'multipart/form-data', // กำหนด Content-Type เป็น multipart/form-data
                        },
                        body: datap, // ข้อมูลที่จะส่ง
                    })
                    .then(response => response.json()) // แปลงการตอบกลับเป็น JSON
                    .then(data => console.log(data)); // แสดงข้อมูลที่ตอบกลับในคอนโซล
                }}color="#6A9AB0"
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