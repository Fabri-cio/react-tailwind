import React, { useState, useEffect } from "react";
import { fetchProductos } from "@/api/producto.api"; // Asegúrate de definir esta función en tu API
import Carrito from "./Carrito";
import ClienteForm from "./ClienteForm";
import { crearVenta } from "@/api/venta.api"; // Función para crear venta

const PuntoDeVenta = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await fetchProductos(); // Asegúrate de tener esta función definida
      setProductos(data);
    };

    obtenerProductos();
  }, []);

  const agregarProducto = (producto, cantidad) => {
    setCarrito((prev) => {
      const productoExistente = prev.find((item) => item.id_producto === producto.id_producto);
      if (productoExistente) {
        return prev.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarProducto = (id_producto) => {
    setCarrito((prev) => prev.filter((item) => item.id_producto !== id_producto));
  };

  const procesarVenta = async () => {
    if (!cliente || carrito.length === 0) {
      alert("Por favor, selecciona un cliente y agrega productos al carrito.");
      return;
    }

    const ventaData = {
      cliente: cliente.id_cliente, // ID del cliente
      total_venta: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2),
    };

    const ventaCreada = await crearVenta(ventaData);
    console.log("Venta creada:", ventaCreada);

    // Aquí puedes crear los detalles de la venta en la API
    // Puedes hacer una llamada para crear detalles de la venta utilizando 'ventaCreada.id_venta'
    // y el carrito que tienes.

    // Restablecer el carrito y el cliente después de procesar la venta
    setCarrito([]);
    setCliente(null);
  };

  return (
    <div>
      <h1>Punto de Venta</h1>
      <ClienteForm setCliente={setCliente} />
      {/* Aquí puedes agregar un selector de productos o un buscador */}
      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => agregarProducto(producto, 1)}>Agregar</button>
          </li>
        ))}
      </ul>

      <Carrito carrito={carrito} eliminarProducto={eliminarProducto} />
      <button onClick={procesarVenta}>Finalizar Venta</button>
    </div>
  );
};

export default PuntoDeVenta;
