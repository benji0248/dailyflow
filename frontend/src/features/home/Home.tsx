import React from "react";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/avatarPhoto/avatarPhoto";
import LogoutButton from "../auth/components/LogoutButton";

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <main className="max-w-screen-xl items-center justify-between mx-auto p-4">
      {isAuthenticated ? (
        <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Avatar name={user?.name}/>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{user?.name} {isAuthenticated}</h1>
                <p className="text-muted-foreground text-gray-600">Aqui esta tu rutina de hoy</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <div className="flex justify-between text-sm">
              <span>Progreso semanal</span>
              <span className="font-medium">{50}%</span>
            </div>
            <ProgressBar progress={50}/>
          </div>
        </div>
      </section>
      ) : (
        <section className="mb-8 text-center">
          <div className="bg-gray-100 shadow-md rounded-2xl p-4">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Bienvenido al administrador de rutinas DailyFlow</h1>
            <p className="text-muted-foreground text-gray-600 mb-4">
              Inicia sesión o regístrate para comenzar.
            </p>
            <button
              onClick={() => window.location.href = "/login" }
              className="text-white me-5 bg-black hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => window.location.href = "/register" }
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrarse
            </button>
            <LogoutButton/>
          </div>
        </section>
      )}
      </main>
    </div>
  );
};

export default Home;
