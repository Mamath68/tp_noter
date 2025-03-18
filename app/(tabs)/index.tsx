import {Button, Text, View} from '@/components/Themed';
import {useRouter} from "expo-router";
import {HomeScreenStyles as styles} from "@/theme";

export default function HomeScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text
                style={
                    [
                        styles.title,
                        {
                            textAlign: "center",
                            marginBottom: 200
                        }
                    ]
                }
            >
                Bienvenu sur notre Application Parcours Sup
            </Text>
            <Button
                title="Register Screen"
                onPress={() => router.push("/RegisterScreen")}
            />
            <View
                style={styles.separator}
                lightColor="#000"
                darkColor="#eee"
            />
            <Button
                title="Liste des inscrits"
                onPress={() => router.push("/UserListScreen")}
            />
        </View>
    );
}
