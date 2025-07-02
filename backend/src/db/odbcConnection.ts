import odbc from "odbc";

const connectionString = 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=C:\\Users\\boc\\Documents\\dailyflow.accdb;'

let connection: odbc.Connection | null = null;

export const connectToAccess = async () => {
    console.log("Intentando establecer conexión a Access...");

    if (connection) {
        console.log("Ya hay una conexión activa. Reutilizando.");
        return connection;
    }

    try {
        connection = await odbc.connect(connectionString);
        console.log("✅ Conectado a Access");
    } catch (error) {
        console.error("❌ Error al conectar a Access:", error);
        throw error;
    }

    return connection;
};