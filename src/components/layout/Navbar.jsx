import { useState, useEffect } from "react";
import useLogout from "../../hooks/useLogout";
import { FaBars, FaEllipsisV, FaBell } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import { ActionButton } from "../shared/ActionButton";
import { toast } from "react-hot-toast";

const isDev = import.meta.env.MODE === "development";

const Navbar = ({ toggleSidebar }) => {
  const logoutUser = useLogout();
  const [notificaciones, setNotificaciones] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔹 Cargar notificaciones existentes desde el backend
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API_BASE_URL}/inventarios/notificaciones/`);
        const data = await res.json();
        // algunos endpoints DRF traen "results", otros no
        setNotificaciones(data.results || data);
      } catch (err) {
        if (isDev) console.error("Error cargando notificaciones:", err);
      }
    };
    fetchNotificaciones();
  }, []);

  // 🔹 Conectar WebSocket para nuevas notificaciones
  useEffect(() => {
    const WS_BASE_URL = import.meta.env.VITE_WS_URL;
    const ws = new WebSocket(`${WS_BASE_URL}/ws/notificaciones/`);

    ws.onopen = () => {
      if (isDev) console.log("✅ Conectado al WebSocket de notificaciones");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (isDev) console.log("📩 Nueva notificación:", data);

      toast(`${data.titulo}: ${data.mensaje}`);

      setNotificaciones((prev) => [
        { ...data, leida: false }, // añade con leida=false por defecto
        ...prev,
      ]);
    };

    ws.onclose = () => {
      if (isDev) console.log("🔌 Desconectado del WebSocket");
    };
    ws.onerror = (err) => {
      if (isDev) console.error("❌ Error WebSocket:", err);
    };

    return () => ws.close();
  }, []);

  // 🔹 Marcar notificación como leída en backend
  const marcarComoLeida = async (id) => {
    if (!id) {
      console.warn("⚠️ No se puede marcar como leída: id indefinido");
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(
        `${API_BASE_URL}/inventarios/notificaciones/${id}/marcar-como-leida/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        if (isDev)
          console.error("❌ Error al marcar como leída:", res.statusText);
        return;
      }

      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch (error) {
      if (isDev) console.error("Error al marcar como leída:", error);
    }
  };

  return (
    <nav className="sticky z-10 flex justify-between p-4 text-white bg-gray-500 shadow-md">
      {/* Botón de menú lateral */}
      <ActionButton
        icon={FaBars}
        onClick={toggleSidebar}
        estilos="p-1 transition-colors duration-200 hover:bg-gray-600 rounded"
      />

      <ActionButton
        to={"/home"}
        estilos="transition-colors duration-200 hover:text-gray-200"
      />

      <div className="flex items-center gap-4 relative">
        {/* 🔔 Campanita */}
        <div className="relative">
          <FaBell
            className="text-2xl cursor-pointer hover:text-yellow-300 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {notificaciones.some((n) => !n.leida) && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold px-1 rounded-full">
              {notificaciones.filter((n) => !n.leida).length}
            </span>
          )}

          {/* Dropdown con notificaciones */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-black shadow-lg rounded-lg p-2 max-h-80 overflow-y-auto">
              {notificaciones.length > 0 ? (
                notificaciones.map((n, i) => (
                  <div
                    key={i}
                    onClick={() => marcarComoLeida(n.id)}
                    className={`border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-100 transition-colors ${
                      n.leida ? "opacity-50" : "bg-white"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{n.titulo}</p>
                    <p className="text-sm text-gray-500">{n.mensaje}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center p-2">
                  Sin notificaciones
                </p>
              )}
            </div>
          )}
        </div>

        {/* Menú de usuario */}
        <Dropdown
          icon={FaEllipsisV}
          options={[
            { label: "Mi Perfil" },
            { label: "Cerrar Sesión", action: logoutUser },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
