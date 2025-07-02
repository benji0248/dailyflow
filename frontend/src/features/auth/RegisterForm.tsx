import { useState } from "react";
import axiosInstance from "../../api/axios";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name" && !nameRegex.test(value)) {
      error = "El nombre solo puede contener letras y espacios.";
    }
    
    if (name === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
        error = "El email no es válido. Debe incluir '@', un dominio y extensión.";
      }
      
    if (name === "password" && !passwordRegex.test(value)) {
      error = "Mínimo 6 caracteres, 1 mayúscula, 1 número y 1 símbolo.";
    }
    if (name === "repeatPassword" && value !== form.password) {
      error = "Las contraseñas no coinciden.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      validateField(name, value); // validamos campo individual
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((e) => e !== "");
    if (hasErrors) {
      setMessage("Por favor corrige los errores antes de continuar.");
      return;
    }

    try {
      const { repeatPassword, ...dataToSend } = form;
      console.log("Enviando datos de registro:", dataToSend);
      const res = await axiosInstance.post("/auth/register", dataToSend);
      setMessage(res.data.message);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setMessage("Error de validación: " + err.response.data.errors[0].message);
      } else {
        setMessage("Error al registrar.");
      }
    }
  };

  const inputClass = (field: string) => {
    const base =
      "bg-white border-2 text-sm rounded-lg focus:ring-2 block w-full p-2.5 transition-all duration-150 " +
      "dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white";
  
    const hasValue = form[field as keyof typeof form].trim() !== "";
    const hasError = !!errors[field];
  
    let colorClass = "";
  
    if (hasError) {
      colorClass = "border-red-500 focus:ring-red-500 focus:border-red-500";
    } else if (hasValue) {
      colorClass = "border-green-500 focus:ring-green-500 focus:border-green-500";
    } else {
      colorClass = "border-blue-300 focus:ring-blue-300 focus:border-blue-300";
    }
  
    return `${base} ${colorClass}`;
  };
  

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight m-4 mb-5">Registro</h2>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            id="name"
            className={inputClass("name")}
            placeholder="Benjamin Ochoa"
            required
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            id="email"
            className={inputClass("email")}
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            id="password"
            className={inputClass("password")}
            required
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir Contraseña</label>
          <input
            name="repeatPassword"
            onChange={handleChange}
            type="password"
            id="repeatPassword"
            className={inputClass("repeatPassword")}
            required
          />
          {errors.repeatPassword && <p className="text-sm text-red-500 mt-1">{errors.repeatPassword}</p>}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrarse
        </button>
      </form>

      {message && <p className="mt-4 text-sm font-medium text-center text-red-500">{message}</p>}
    </div>
  );
}

export default RegisterForm;
