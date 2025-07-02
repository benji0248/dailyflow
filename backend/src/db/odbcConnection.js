"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToAccess = void 0;
const odbc_1 = __importDefault(require("odbc"));
const connectionString = 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=C:\\Users\\boc\\Documents\\dailyflow.accdb;';
let connection = null;
const connectToAccess = async () => {
    console.log("Intentando establecer conexión a Access...");
    if (connection) {
        console.log("Ya hay una conexión activa. Reutilizando.");
        return connection;
    }
    try {
        connection = await odbc_1.default.connect(connectionString);
        console.log("✅ Conectado a Access");
    }
    catch (error) {
        console.error("❌ Error al conectar a Access:", error);
        throw error;
    }
    return connection;
};
exports.connectToAccess = connectToAccess;
