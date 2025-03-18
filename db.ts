import * as SQLite from 'expo-sqlite';

interface Eleves {
    id?: number;
    nom: string;
    prenom: string;
    birthday: string;
    email: string;
    telephone: string;
    moyenne: number;
}

export class ParcourSup {
    private DB_NAME = 'parcourssup.db';

    DBDestroy = async () => {
        const db = await SQLite.openDatabaseAsync(this.DB_NAME);
// language=SQLite
        await db.execAsync(`
            DROP TABLE IF EXISTS eleves`);
    }

    DBInit = async () => {
        const db = await SQLite.openDatabaseAsync(this.DB_NAME);
        try {
// language=SQLite
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS eleves
                (
                    id        INTEGER PRIMARY KEY AUTOINCREMENT,
                    nom       TEXT NOT NULL,
                    prenom    TEXT NOT NULL,
                    birthday  TEXT NOT NULL,
                    email     TEXT NOT NULL,
                    telephone TEXT NOT NULL,
                    moyenne   REAL NOT NULL
                );`);

        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base de données:", error);
        }
    }

    addEleve = async (eleves: Eleves) => {
        try {
            const db = await SQLite.openDatabaseAsync(this.DB_NAME);
            await db.runAsync(
                'INSERT INTO eleves (nom, prenom, birthday, email, telephone, moyenne) VALUES (?, ?, ?, ?, ?, ?);',
                [eleves.nom, eleves.prenom, eleves.birthday, eleves.email, eleves.telephone, eleves.moyenne]
            );
            console.log("Succeès de l'ajout de l'élève");
            return true;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'élève:", error);
            return false;
        }
    };

    GetAllEleves = async (): Promise<Eleves[]> => {
        try {
            const db = await SQLite.openDatabaseAsync(this.DB_NAME);
            return await db.getAllAsync<Eleves>('SELECT * FROM eleves ORDER BY moyenne DESC;');
        } catch (error) {
            console.error("Erreur lors de la récupération des élèves:", error);
            return [];
        }
    };

    GetEleveById = async (id: number): Promise<Eleves | null> => {
        try {
            const db = await SQLite.openDatabaseAsync(this.DB_NAME);
            const result = await db.getFirstAsync<Eleves>('SELECT * FROM eleves WHERE id = ?;', [id]);
            return result ?? null;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'élève:", error);
            return null;
        }
    };

}
