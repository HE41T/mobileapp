import * as React from 'react';
import {View, Text } from "react-native";


export default function ClockScreen() {
    const [time, setTime] = React.useState();

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    },[]);

    return (
        <View>
            <Text>{time}</Text>
        </View>
    );
}