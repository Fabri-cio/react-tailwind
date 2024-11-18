import React from "react";

const Carrito = ({ carrito, eliminarProducto }) => {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((item) => (
          <li key={item.id_producto}>
            {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio * item.cantidad}
            <button onClick={() => eliminarProducto(item.id_producto)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</h3>
    </div>
  );
};

export default Carrito;
