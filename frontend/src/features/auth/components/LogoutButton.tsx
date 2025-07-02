import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 text-sm text-red-500 hover:underline"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
