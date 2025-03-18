import {useState} from "react";
import {Button, Input, Text, View} from '@/components/Themed';
import {RegisterScreenStyles as styles} from "@/theme";
import {DatePickerInput} from "react-native-paper-dates";
import {useRouter} from "expo-router";
import {SafeAreaView, ScrollView} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function RegisterScreen() {
    const [prenom, setFirstName] = useState("");
    const [nom, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState(undefined);
    const [moyenne, setAvgScore] = useState("");

    const router = useRouter();

    const handleValidate = () => {
        if (prenom.trim() && nom.trim() && email.trim() && birthday && telephone.trim() && moyenne.trim()) {
            router.push({
                pathname: "/UserListScreen",
                params: {
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    telephone: Number(telephone),
                    moyenne: Number(moyenne),
                    birthday: birthday,
                },
            });

        } else {
            alert("Tous les champs sont obligatoires !");
        }
    };

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <ScrollView>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.label}>Prenom</Text>
                        <Input
                            placeholder="Prénom"
                            onChangeText={setFirstName}
                            style={styles.input}
                            keyboardType="default"
                            value={prenom}
                        />
                        <Text style={styles.label}>Nom</Text>
                        <Input
                            placeholder="Nom"
                            onChangeText={setLastName}
                            style={styles.input}
                            keyboardType="default"
                            value={nom}
                        />
                        <SafeAreaProvider>
                            <Text style={styles.label}>Date de Naissance</Text>
                            <DatePickerInput
                                locale="fr"
                                label="Date de Naissance"
                                value={birthday}
                                onChange={(d: any) => {
                                    setBirthday(d);
                                }}
                                style={styles.timeInput}
                                mode="flat" inputMode={"start"}/>
                        </SafeAreaProvider>
                        <Text style={styles.label}>Email</Text>
                        <Input
                            placeholder="Email"
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            value={email}
                        />
                        <Text style={styles.label}>Téléphone</Text>
                        <Input
                            placeholder="Téléphone"
                            onChangeText={setPhoneNumber}
                            style={styles.input}
                            keyboardType="numeric"
                            value={telephone}
                        />
                        <Text style={styles.label}>Moyenne Générale</Text>
                        <Input
                            placeholder="Moyenne Générale"
                            onChangeText={setAvgScore}
                            style={styles.input}
                            keyboardType="numeric"
                            value={moyenne}
                        />
                    </SafeAreaView>
                </SafeAreaProvider>
            </ScrollView>

            <Button title="Valider" onPress={handleValidate}/>
        </View>
    );
}
