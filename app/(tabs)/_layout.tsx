import {Stack} from 'expo-router';
import {useEffect, useState} from "react";
import {ParcourSup} from "@/db";
import {SQLiteProvider} from "expo-sqlite";

export default function TabLayout() {
    const [db] = useState(new ParcourSup());

    useEffect(() => {
        db.DBDestroy();
        db.DBInit();
    }, []);
    return (
        <SQLiteProvider databaseName="parcourssup.db">

            <Stack screenOptions={{
                headerTitle: "TP EXPO",
                headerStyle: {
                    backgroundColor: "purple"
                },
                headerTintColor: "white"
            }}/>
        </SQLiteProvider>
    );
}
