import React, { useEffect, useState } from "react"; // นำเข้า React และ Hooks ที่จำเป็น
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native"; // นำเข้าคอมโพเนนต์ที่จำเป็นจาก React Native

// คอมโพเนนต์หลักสำหรับหน้าหลักของแอป
export default function HomeScreen({ navigation }) {
  const [time, setTime] = useState(); // สถานะสำหรับเก็บเวลา
  const [searchQuery, setSearchQuery] = useState(''); // สถานะสำหรับเก็บค่าการค้นหา
  const [searchResults, setSearchResults] = useState([]); // สถานะสำหรับเก็บผลการค้นหา
  const [loading, setLoading] = useState(false); // สถานะสำหรับการโหลดข้อมูล

  // ใช้ useEffect เพื่อสร้าง timer ที่อัปเดตเวลา
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // อัปเดตเวลาทุกวินาที
    }, 1000);

    return () => {
      clearInterval(timer); // ลบ timer เมื่อคอมโพเนนต์ถูกทำลาย
    };
  }, []);

  // ฟังก์ชันเพื่อดึงผลการค้นหา
  const fetchSearchResults = () => {
    setLoading(true); // เริ่มการโหลดข้อมูล
    fetch(`http://172.21.12.190/wow/search.php?query=${encodeURIComponent(searchQuery)}`) // ส่งคำค้นหาไปยังเซิร์ฟเวอร์
      .then((response) => response.json()) // แปลงการตอบกลับเป็น JSON
      .then((json) => {
        setSearchResults(json); // ตั้งค่าผลการค้นหา
        setLoading(false); // หยุดการโหลดข้อมูล
      })
      .catch((error) => {
        console.error('Error fetching search results:', error); // แสดงข้อผิดพลาดในคอนโซล
        setLoading(false); // หยุดการโหลดข้อมูลเมื่อเกิดข้อผิดพลาด
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar} // สไตล์สำหรับช่องค้นหา
        placeholder="Search..." // ข้อความแสดงเมื่อไม่มีการป้อนข้อมูล
        value={searchQuery} // ค่าในช่องค้นหา
        onChangeText={(text) => setSearchQuery(text)} // อัปเดตค่าการค้นหาเมื่อผู้ใช้พิมพ์
        onSubmitEditing={fetchSearchResults} // ดึงผลการค้นหาเมื่อผู้ใช้กด Enter
      />

      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.time}>{time}</Text>

      {/* แสดงผลการค้นหา */}
      {loading ? (
        <Text>Loading...</Text> // แสดงข้อความ "Loading..." ขณะโหลดข้อมูล
      ) : (
        <FlatList
          data={searchResults} // ข้อมูลที่จะแสดงใน FlatList
          keyExtractor={(item) => item.id.toString()} // คีย์ที่ไม่ซ้ำสำหรับแต่ละรายการ
          renderItem={({ item }) => ( // ฟังก์ชันสำหรับแสดงรายการ
            <View style={styles.resultItem}>
              <Text>ID: {item.id}</Text>
              <Text>User ID: {item.user_id}</Text>
              <Text>User Name: {item.user_name}</Text>
              <Text>Password: {item.passwd}</Text>
            </View>
          )}
        />
      )}

      {/* ปุ่มนำทางไปยังหน้าต่างต่างๆ */}
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

// สไตล์สำหรับคอมโพเนนต์
const styles = StyleSheet.create({
  container: {
    flex: 1, // ใช้พื้นที่เต็มที่
    alignItems: "center", // จัดให้อยู่กลางแนวนอน
    justifyContent: "center", // จัดให้อยู่กลางแนวตั้ง
    backgroundColor: "#f5f5f5", // สีพื้นหลัง
    padding: 20, // ขนาด padding รอบคอมโพเนนต์
  },
  title: {
    fontSize: 30, // ขนาดฟอนต์สำหรับชื่อเรื่อง
    fontWeight: "bold", // ทำให้ฟอนต์หนา
    marginBottom: 10, // ระยะห่างด้านล่าง
    color: "#006769", // สีฟอนต์
  },
  time: {
    fontWeight: "bold", // ทำให้ฟอนต์หนา
    fontSize: 30, // ขนาดฟอนต์
    marginBottom: 20, // ระยะห่างด้านล่าง
    color: "#40A578", // สีฟอนต์
  },
  button: {
    backgroundColor: "#001F3F", // สีพื้นหลังของปุ่ม
    borderRadius: 5, // มุมโค้งของปุ่ม
    padding: 15, // ขนาด padding ในปุ่ม
    width: "100%", // ความกว้างของปุ่ม
    alignItems: "center", // จัดให้อยู่กลางแนวนอน
    marginVertical: 10, // ระยะห่างในแนวดิ่ง
  },
  buttonText: {
    color: "#FFFFFF", // สีฟอนต์ในปุ่ม
    fontSize: 18, // ขนาดฟอนต์
  },
  searchBar: {
    borderWidth: 1, // ความหนาของขอบช่องค้นหา
    borderColor: "#ccc", // สีของขอบช่องค้นหา
    borderRadius: 5, // มุมโค้งของช่องค้นหา
    padding: 10, // ขนาด padding ในช่องค้นหา
    width: "100%", // ความกว้างของช่องค้นหา
    marginBottom: 20, // ระยะห่างด้านล่าง
  },
  resultItem: {
    padding: 5, // ขนาด padding ในแต่ละรายการผล
    borderBottomWidth: 1, // ความหนาของขอบด้านล่าง
    borderBottomColor: '#ccc', // สีของขอบด้านล่าง
    width: '100%', // ความกว้างของรายการผล
  }
});
