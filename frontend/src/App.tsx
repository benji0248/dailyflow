import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import ShopListPage from "./features/shopList/components/ShopListPage";
import Register from "./features/auth/routes/Register";
import Login from "./features/auth/routes/Login";
import PrivateRoute from "./routes/PrivatesRoutes";
import ProfilePage from "./features/profile/Profile";
import MealPlanningApp from "./features/meals/Meals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Private routes can be added here, e.g.:*/}
        <Route element={<PrivateRoute />}>
          <Route path="/compras" element={<ShopListPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/comidas" element={<MealPlanningApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
