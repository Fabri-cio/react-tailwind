import React, { useState } from "react";
// import { Receipt } from "./Receipt";
import {useInventarios } from "../../hooks/useEntities";
export default function POS() {
  const { data: productos = [] } = useInventarios(true);
  const datos = productos.data || [];
  console.log(datos);

  const [consulta, setConsulta] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [pagar, setPagar] = useState(0);
  const [mostrarRecibo, setMostrarRecibo] = useState(false);

  const filtrado = datos.filter((p) =>
    p.id_producto_nombre.toLowerCase().includes(consulta.toLowerCase())
  );

  const añadirAlCarrito = (product) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id_producto === product.id_producto);
      if (existe) {
        return prev.map((p) =>
          p.id_producto === product.id_producto
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setConsulta("");
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const manejarPago = () => {
    if (pagar < total) return alert("Pago insuficiente");
    // Aquí iría la llamada al backend
    setMostrarRecibo(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Punto de Venta</h1>

      <input
        type="text"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder="Buscar producto..."
        className="border p-2 w-full mb-4"
      />

      {consulta && (
        <div className="border p-2 bg-white shadow mb-4">
          {filtrado.map((product) => (
            <div
              key={product.id_producto}
              className="cursor-pointer hover:bg-gray-100 p-1"
              onClick={() => añadirAlCarrito(product)}
            >
              {product.id_producto_nombre} - ${product.precio}
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Carrito</h2>
        {carrito.map((item) => (
          <div key={item.id_producto} className="flex justify-between">
            <span>
              {item.id_producto_nombre} x{item.quantity}
            </span>
            <span>${item.precio * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <input
        type="number"
        placeholder="Pago recibido"
        className="border p-2 w-full mb-2"
        value={pagar}
        onChange={(e) => setPagar(parseFloat(e.target.value) || 0)}
      />

      <button
        onClick={manejarPago}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Facturar
      </button>

      {/* {mostrarRecibo && <Receipt carrito={carrito} total={total} pagar={pagar} />} */}
    </div>
  );
}
