import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutAll } from "../api/usuario.api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook para manejar el logout
const useLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const logoutMutation = useMutation({
    mutationFn: logoutAll,
    onSuccess: () => {
      console.log("Sesión cerrada");
      logoutUser(); //limpia el estado global + localStorage
      navigate("/");
    },
    onError: (error) => {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    },
  });

  return logoutMutation.mutate;  // Retornamos solo la función mutate
};

export default useLogout;
