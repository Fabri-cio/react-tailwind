import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegistrarUsuario } from "../hooks/useRegistrarUsuario";

const Register = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const schema = yup.object({
    email: yup
      .string()
      .email("Field expects an email address")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":;{}|<>+]/,
        "Password must contain at least one special character"
      ),
    password2: yup
      .string()
      .required("Password confirmation is a required field")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });
  const { mutate, isLoading } = useRegistrarUsuario();

  const submission = (data) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => { // Aquí se corrige el nombre de la clave
          navigate("/");
        },
        onError: () => {
          setShowMessage(true);
          setMessage("Error creando usuario");
        },
      }
    );
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-400 to-orange-300">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center font-bold text-orange-600 mb-6">
          Registro de Usuario
        </h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-red-600 rounded-md">
            {message}
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
                  autoComplete="username"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <Controller
              name="password2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400" disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}

          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-orange-600 hover:underline">
          ¿Ya estás registrado? ¡Por favor inicia sesión!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
