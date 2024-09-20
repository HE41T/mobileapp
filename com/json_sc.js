import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from 'react-native';

// คอมโพเนนต์หลักสำหรับแสดงและแก้ไขข้อมูล JSON
export default function JsonScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true); // สถานะสำหรับแสดงโหลด
  const [data, setData] = useState([]); // สถานะสำหรับเก็บข้อมูลที่ดึงมา
  const [selectedId, setSelectedId] = useState(null); // สถานะเพื่อติดตาม ID ของผู้ใช้ที่เลือกสำหรับการแก้ไข
  const [message, setMessage] = useState(''); // สถานะสำหรับแสดงข้อความ
  const [isEditing, setIsEditing] = useState(false); // สถานะควบคุมโหมดการแก้ไข
  const [id, onChangeid] = useState(''); // สถานะสำหรับ ID ผู้ใช้
  const [user_id, onChangeUid] = useState(''); // สถานะสำหรับ User ID
  const [user_name, onChangeUname] = useState(''); // สถานะสำหรับชื่อผู้ใช้
  const [passwd, onChangePwd] = useState(''); // สถานะสำหรับรหัสผ่าน

  // ดึงข้อมูลเมื่อคอมโพเนนต์ถูกติดตั้ง
  useEffect(() => {
    fetch('http://172.21.12.190/wow/getjson.php') // ดึงข้อมูล JSON จาก API
      .then((response) => response.json()) // แปลงการตอบกลับเป็น JSON
      .then((json) => {
        console.log('Data received:', json); // แสดงข้อมูลที่ได้รับในคอนโซล
        setData(json); // ตั้งค่าสถานะข้อมูล
      })
      .catch((error) => console.error('Error:', error)) // แสดงข้อผิดพลาดในคอนโซล
      .finally(() => setLoading(false)); // ตั้งค่าสถานะโหลดเป็น false ในที่สุด
  }, []);

  // ฟังก์ชันสำหรับจัดการการแก้ไขรายการ
  const handleEdit = (item) => {
    onChangeid(item.id); // ตั้งค่า ID ของรายการที่เลือก
    onChangeUid(item.user_id); // ตั้งค่า User ID ของรายการที่เลือก
    onChangeUname(item.user_name); // ตั้งค่า User Name ของรายการที่เลือก
    onChangePwd(item.passwd); // ตั้งค่า Password ของรายการที่เลือก
    setSelectedId(item.id); // อัปเดต selected ID
    setIsEditing(true); // เปิดโหมดการแก้ไข
  };

  // ฟังก์ชันสำหรับจัดการการอัปเดตรายการ
  const handleUpdate = () => {
    if (!selectedId) {
      Alert.alert('Error', 'No User selected for editing'); // แจ้งเตือนถ้าไม่มีผู้ใช้ที่เลือก
      return;
    }

    // ส่งคำขออัปเดตไปยังเซิร์ฟเวอร์
    fetch(`http://172.21.12.190/wow/update.php?id=${selectedId}`, {
      method: 'POST', // ใช้ POST สำหรับการอัปเดต
      headers: {
        'Content-Type': 'application/json', // ตั้งค่า content type เป็น JSON
      },
      body: JSON.stringify({
        user_id,
        user_name,
        passwd,
      }), // ส่งข้อมูลผู้ใช้ที่อัปเดต
    })
      .then((response) => response.json()) // แปลงการตอบกลับเป็น JSON
      .then((json) => {
        if (json.success) {
          Alert.alert('Success', 'User updated successfully'); // แจ้งเตือนเมื่ออัปเดตสำเร็จ
          // อัปเดตสถานะข้อมูลด้วยค่าที่ใหม่
          setData((prevData) => 
            prevData.map((item) => 
              item.id === selectedId 
                ? { ...item, user_id, user_name, passwd } 
                : item
            )
          );
          resetForm(); // รีเซ็ตฟอร์มหลังจากการอัปเดต
        } else {
          Alert.alert('Error', `Failed to update the User`); // แจ้งเตือนเมื่ออัปเดตไม่สำเร็จ
        }
      })
      .catch((error) => {
        console.error('Error updating User:', error); // แสดงข้อผิดพลาดในคอนโซล
        Alert.alert('Error', 'An error occurred while updating the User'); // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
      });
  };

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  const resetForm = () => {
    onChangeid(''); // รีเซ็ต ID
    onChangeUid(''); // รีเซ็ต User ID
    onChangeUname(''); // รีเซ็ต User Name
    onChangePwd(''); // รีเซ็ต Password
    setSelectedId(null); // ล้าง selected ID
    setIsEditing(false); // ปิดโหมดการแก้ไข
  };

  // ฟังก์ชันสำหรับจัดการการลบผู้ใช้
  const handleDelete = (id) => {
    // ส่งคำขอลบไปยังเซิร์ฟเวอร์
    fetch(`http://172.21.12.190/wow/delete.php?id=${id}`, {
      method: 'DELETE', // ใช้ DELETE สำหรับการลบ
    })
      .then((response) => response.json()) // แปลงการตอบกลับเป็น JSON
      .then((json) => {
        if (json.success) {
          Alert.alert('User deleted successfully'); // แจ้งเตือนเมื่อการลบสำเร็จ
          // กรองผู้ใช้ที่ถูกลบออกจากสถานะข้อมูล
          setData(data.filter((item) => item.id !== id));
          
          resetForm(); // รีเซ็ตฟอร์มหลังจากการลบ
        } else {
          Alert.alert(`Failed to delete the User: ${json.message}`); // แจ้งเตือนเมื่อการลบไม่สำเร็จ
        }
      })
      .catch((error) => {
        console.error('Error deleting User:', error); // แสดงข้อผิดพลาดในคอนโซล
        Alert.alert('An error occurred while deleting the User'); // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
      });
  };

  // ฟังก์ชันสำหรับยืนยันการลบผู้ใช้
  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this User?', // ข้อความยืนยัน
      [
        {
          text: 'Cancel', // ปุ่มยกเลิก
          style: 'cancel',
        },
        {
          text: 'Delete', // ปุ่มลบ
          onPress: () => handleDelete(id), // เรียกใช้ handleDelete ถ้ายืนยัน
          style: 'destructive',
        },
      ],
      { cancelable: true } // สามารถยกเลิกได้
    );
  };

  // สถานะโหลด
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text>Loading...</Text> 
      </View>
    );
  }

  // สถานะไม่มีข้อมูล
  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text> 
      </View>
    );
  }

  // การแสดงผลหลักของคอมโพเนนต์
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {message ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'red', fontSize: 16 }}>{message}</Text>
        </View>
      ) : null}

      {/* แสดงฟิลด์กรอกข้อมูลถ้ามีรายการที่เลือกสำหรับการแก้ไข */}
      {selectedId && isEditing && (
        <View>
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>
            ID: {id || "N/A"}  {/* แสดง "N/A" ถ้า ID ว่าง */}
          </Text>

          <TextInput
            placeholder="User ID" // Placeholder สำหรับกรอก User ID
            value={user_id} // ฟิลด์ควบคุม
            onChangeText={onChangeUid} // อัปเดตสถานะเมื่อมีการเปลี่ยนแปลง
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize: 16 }} // สไตล์
          />
          <TextInput
            placeholder="User Name" // Placeholder สำหรับกรอก User Name
            value={user_name} // ฟิลด์ควบคุม
            onChangeText={onChangeUname} // อัปเดตสถานะเมื่อมีการเปลี่ยนแปลง
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize: 16 }} // สไตล์
          />
          <TextInput
            placeholder="Password" // Placeholder สำหรับกรอก Password
            value={passwd} // ฟิลด์ควบคุม
            onChangeText={onChangePwd} // อัปเดตสถานะเมื่อมีการเปลี่ยนแปลง
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, fontSize: 16 }} // สไตล์
            //secureTextEntry // ยกเลิกการแสดงรหัสผ่านเพื่อซ่อน
          />
          <Button
            title="Update Item" // ป้ายชื่อปุ่ม
            onPress={handleUpdate} // เรียกใช้ handleUpdate เมื่อกด
            color="#6A9AB0" // สีของปุ่ม
          />
        </View>
      )}

      {/* แสดงรายการผู้ใช้ */}
      <FlatList
        data={data} // ข้อมูลที่จะนำเสนอ
        keyExtractor={(item) => item.id.toString()} // คีย์ที่ไม่ซ้ำสำหรับแต่ละรายการ
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <TouchableOpacity onPress={() => handleEdit(item)}> 
              <Text style={style.headers}>ID: {item.id}</Text>
              <Text style={style.info}>User ID: {item.user_id}</Text>
              <Text style={style.info}>User Name: {item.user_name}</Text>
              <Text style={style.info}>Password: {item.passwd}</Text>
            </TouchableOpacity>
            {selectedId !== item.id && ( // แสดงปุ่มลบถ้ารายการไม่ได้เลือก
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Button title="     Delete     " onPress={() => confirmDelete(item.id)} color="#C7253E" />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

// สไตล์สำหรับข้อความ
const style = StyleSheet.create({
    headers:{
      fontSize:18, // ขนาดฟอนต์สำหรับหัวข้อ
    },
    info:{
      fontSize:16, // ขนาดฟอนต์สำหรับข้อมูล
    },
});
