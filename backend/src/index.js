"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = __importDefault(require("./features/users/usersRoutes"));
const foodRoutes_1 = __importDefault(require("./features/foods/foodRoutes"));
const foodScheduleRoutes_1 = __importDefault(require("./features/foodSchedule/foodScheduleRoutes"));
const cleanScheduleRoutes_1 = __importDefault(require("./features/cleanSchedule/cleanScheduleRoutes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
    credentials: true,
}));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/api/users', usersRoutes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/api/foods', foodRoutes_1.default);
app.use('/api/food-schedules', foodScheduleRoutes_1.default);
app.use('/api/clean-schedules', cleanScheduleRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
