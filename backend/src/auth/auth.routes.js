"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const odbcConnection_1 = require("../db/odbcConnection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "El nombre es obligatorio."),
    email: zod_1.z.string().email("Email inválido."),
    password: zod_1.z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});
router.post("/register", async (req, res) => {
    console.log("🟢 Nueva solicitud de registro recibida");
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        console.log("🔴 Error de validación:", validation.error.errors);
        res.status(400).json({ errors: validation.error.errors });
        return;
    }
    const newUser = validation.data;
    try {
        console.log("🟡 Conectando a base de datos...");
        const connection = await (0, odbcConnection_1.connectToAccess)();
        console.log("🟢 Conexión establecida.");
        const hashedPassword = await bcrypt_1.default.hash(newUser.password, 10);
        console.log("🔐 Contraseña hasheada.");
        await connection.query(`INSERT INTO users (name, email, password) VALUES ('${newUser.name}', '${newUser.email}', '${hashedPassword}')`);
        res.status(201).json({ message: "Usuario registrado exitosamente." });
        return;
    }
    catch (error) {
        console.error("🔥 Error en el proceso de registro:", error);
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email y contraseña son obligatorios." });
        return;
    }
    try {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const [user] = await connection.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (!user || Object.keys(user).length === 0) {
            res.status(401).json({ message: "Credenciales inválidas." });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Credenciales inválidas." });
            return;
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET environment variable is not set.");
            res.status(500).json({ message: "Error interno del servidor." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1h" });
        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});
exports.default = router;
