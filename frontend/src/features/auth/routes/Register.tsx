import RegisterForm from "../RegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-container">
        <main className="max-w-screen-sm mx-auto p-4">
            <section className="mt-5 mb-8">
                <div className="bg-gray-100 shadow-md rounded-2xl p-4">
                    <RegisterForm />
                </div>
            </section>
        </main>
    </div>
  );
}
export default Register;
