import odbc from "odbc";

const connectionString = 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=C:\\Users\\boc\\Documents\\dailyflow.accdb;'

let connection: odbc.Connection | null = null;

export const connectToAccess = async () => {
    if (connection) {
        return connection;
    }

    try {
        connection = await odbc.connect(connectionString);
        console.log("Connected to Access database");
    } catch (error) {
        console.error("Error connecting to Access database:", error);
        throw error;
    }

    return connection;
}