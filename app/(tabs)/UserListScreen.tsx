import {Button, Text, View} from '@/components/Themed';
import {UserListScreenStyles as styles} from "@/theme";
import {useEffect, useState} from "react";
import {ParcourSup} from "@/db";
import {ActivityIndicator, FlatList} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";


interface Eleves {
    id?: number;
    nom: string;
    prenom: string;
    birthday: string;
    email: string;
    telephone: string;
    moyenne: number;
}

export default function UserListScreen() {
    const {
        nom,
        prenom,
        birthday,
        email,
        telephone,
        moyenne
    } = useLocalSearchParams();
    const router = useRouter();
    const [eleves, setEleves] = useState<Eleves[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setIsSaving] = useState(true);
    const [, setSaveStatus] = useState<"success" | "error" | null>(null);
    useEffect(() => {
        const db = new ParcourSup();
        const saveEleves = async () => {
            try {
                const eleves = {
                    nom: String(nom),
                    prenom: String(prenom),
                    birthday: String(birthday),
                    email: String(email),
                    telephone: String(telephone),
                    moyenne: Number(moyenne),
                };

                await db.addEleve(eleves);
                setSaveStatus("success");
            } catch (error) {
                console.error("Erreur lors de l'enregistrement du score:", error);
                setSaveStatus("error");
            } finally {
                setIsSaving(false);
            }
        };

        const loadEleves = async () => {
            try {
                const allEleves = await db.GetAllEleves();
                setEleves(allEleves);
            } catch (error) {
                console.error("Erreur lors du chargement des scores:", error);
            } finally {
                setLoading(false);
            }
        };

        saveEleves();
        loadEleves();
    }, []);

    const renderEleves = ({item, index}: { item: Eleves, index: number }) => {
        return (
            <View style={styles.scoreItem}>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.prenom + " " + item.nom}</Text>
                    <Text style={styles.name}>{item.moyenne}/20</Text>
                </View>
                <Button onPress={() => router.push({pathname: "/UserScreen", params: {id: item.id?.toString()}})}
                        title="Voir le détail"/>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les Etudiants</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Chargement des scores...</Text>
                </View>
            ) : eleves.length > 0 ? (
                <FlatList
                    data={eleves}
                    renderItem={renderEleves}
                    keyExtractor={(item) => (item.id?.toString() || item.birthday)}
                    style={styles.list}
                />
            ) : (
                <Text style={styles.emptyText}>Aucun Elève enregistré</Text>
            )}
        </View>
    );
}
