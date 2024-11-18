import React from "react";
import { toast } from "react-hot-toast";
import { deleteProducto } from "@/api/producto.api"; // Asegúrate de que esta función esté bien definida en tu archivo de API
import { useNavigate } from "react-router-dom";

function BotonEliminar({ productoId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmar) {
      try {
        await deleteProducto(productoId); // Llama a la API para eliminar el producto
        toast.success("Producto eliminado con éxito", {
          position: "bottom-center",
          style: {
            background: "#404040",
            color: "#fff",
          },
        });
        navigate("/inventario/productos"); // Redirige a la lista de productos
      } catch (error) {
        toast.error("Error al eliminar el producto", {
          position: "bottom-center",
          style: {
            background: "#404040",
            color: "#fff",
          },
        });
      }
    }
  };

  return (
    <button
      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
}

export default BotonEliminar;
