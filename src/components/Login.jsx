import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`login/`, {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        console.log("Inicio de sesión exitoso:", response.data);
        localStorage.setItem("Token", response.data.token);
        setLoginSuccess(true);
        navigate(`/home`);
      })
      .catch((error) => {
        setShowMessage(true);
        console.error("Error durante el inicio de sesión", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">
          Iniciar sesión
        </h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-red-600 rounded-md">
            Error al iniciar sesión, inténtelo de nuevo o restablezca su
            contraseña.
          </div>
        )}

        {loginSuccess && (
          <div className="mb-4 p-4 text-white bg-green-600 rounded-md">
            ¡Sesión iniciada correctamente!
          </div>
        )}

        <form onSubmit={handleSubmit(submission)}>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  autoComplete="username" // Atributo añadido aquí
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password" // Atributo añadido aquí
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/register" className="text-sm text-blue-600 hover:underline">
            ¿No tienes cuenta? ¡Regístrate!
          </a>
          <br />
          <a
            href="/request/password_reset"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña? Haz clic aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
