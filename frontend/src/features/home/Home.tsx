import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ProgressBar from "../../components/progressBar/ProgressBar";
import AvatarPhoto from "../../components/avatarPhoto/avatarPhoto";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-screen-xl items-center justify-between mx-auto p-4">
      <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <AvatarPhoto/>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Benjamin Ochoa</h1>
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
      </main>
    </div>
  );
};

export default Home;
