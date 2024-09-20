import React from "react"; 
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View } from 'react-native';
export default InsertScreen = () => { 
    const [isLoading, setLoading] = React.useState(true); // สถานะสำหรับการโหลดข้อมูล
    const [user_id, onChangeUid] = React.useState(''); // สถานะสำหรับ User ID
    const [user_name, onChangeUname] = React.useState(''); // สถานะสำหรับชื่อผู้ใช้
    const [passwd, onChangPwd] = React.useState(''); // สถานะสำหรับรหัสผ่าน
    const [data, setData] = React.useState([]); // สถานะสำหรับเก็บข้อมูลที่ได้รับ
    
    return ( 
        <SafeAreaView> 
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
                title="Insert Get Data" // ป้ายชื่อปุ่ม
                onPress={() => { // ฟังก์ชันที่จะเรียกใช้เมื่อกดปุ่ม
                    fetch('http://172.21.12.190/wow/insertget.php?user_id=' + user_id + '&user_name=' + user_name + '&passwd=' + passwd) // ส่งข้อมูลไปยังเซิร์ฟเวอร์
                        .then((response) => response.json()) // แปลงการตอบกลับเป็น JSON
                        .then((json) => setData(json)) // ตั้งค่าข้อมูลที่ได้รับ
                        .catch((error) => console.error(error)) // จัดการกับข้อผิดพลาด
                        .finally(() => setLoading(false)); // ตั้งค่า isLoading เป็น false หลังจากการดำเนินการเสร็จ
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