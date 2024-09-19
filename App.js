import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './com/home_sc';
import AboutScreen from './com/about_sc';
import JsonScreen from './com/json_sc';
//import ClockScreen from './com/clock_sc';
import InsertPostScreen from './com/insertPost_sc';
import InsertScreen from'./com/insert_sc';
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                />
                <Stack.Screen
                    name="InsertPost"
                    component={InsertPostScreen}
                />
                <Stack.Screen
                    name="Json"
                    component={JsonScreen}
                />
                {/* <Stack.Screen
                    name="Clock"
                    component={ClockScreen}
                /> */}
                <Stack.Screen
                    name="InsertGet"
                    component={InsertScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}