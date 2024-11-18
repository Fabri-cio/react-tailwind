import React, { useEffect, useState } from "react";
import BotonCrear from "@/components/Inventario/BotonCrear";
import { ProductoCard } from "./ProductoCard";
import { getAllProductos } from "../../api/producto.api";

export function ProductoList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const res = await getAllProductos();
      setProductos(res.data);
      console.log(res);
    }
    cargarProductos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <BotonCrear />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Descripción</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Cantidad en Stock
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Unidad de Medida
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
            <th className="py-2 px-4 border-b border-gray-200">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <ProductoCard key={prod.id_producto} prod={prod} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
