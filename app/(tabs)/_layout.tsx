import {Stack} from 'expo-router';

export default function TabLayout() {

    return (
        <Stack screenOptions={{
            headerTitle: "TP EXPO",
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }}/>
    );
}
