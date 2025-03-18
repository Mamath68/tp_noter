import {Button, Text, View} from '@/components/Themed';
import {UserScreenStyles as styles} from "@/theme";
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

export default function UserScreen() {
    const {
        id,
    } = useLocalSearchParams();
    const router = useRouter();
    const [eleves, setEleves] = useState<Eleves[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const db = new ParcourSup();

        const loadEleve = async () => {
            try {
                if (!id) {
                    console.error("ID manquant pour la récupération de l'élève");
                    setLoading(false);
                    return;
                }
                const eleve = await db.GetEleveById(Number(id));
                setEleves(eleve ? [eleve] : []);
            } catch (error) {
                console.error("Erreur lors du chargement des scores:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEleve();
    }, [id]);


    const renderEleves = ({item}: { item: Eleves, index: number }) => {
        const date = new Date(item.birthday);
        const formattedDate = date.toLocaleDateString();

        return (
            <View style={styles.scoreItem}>
                <View>
                    <Text style={styles.name}>Prénom: {item.prenom}</Text>
                    <Text style={styles.name}>Nom: {item.nom}</Text>
                    <Text style={styles.name}>Date de Naissance: {formattedDate}</Text>
                    <Text style={styles.name}>Email: {item.email}</Text>
                    <Text style={styles.name}>Téléphone: {"0" + item.telephone}</Text>
                    <Text style={styles.name}>Moyenne: {item.moyenne}/20</Text>
                </View>
                <Button onPress={() => router.push("/")} title="Retour à l'accueil"/>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fiche étudiant</Text>
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
                />
            ) : (
                <Text style={styles.emptyText}>Aucun Elève enregistré</Text>
            )}
        </View>
    );
}
