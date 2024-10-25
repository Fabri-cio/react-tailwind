import React from "react";
import Salidas from "../pages/Inventarios/Salidas";

function DataSalida() {
  const salidasData = [
    {
      id: 1,
      producto: "Coca-Cola 500ml",
      categoria: "Bebidas",
      cantidad: 20,
      fechaSalida: "10/10/2024",
      motivo: "Venta",
      responsable: "Juan Pérez",
      precioVenta: 1.5,
      cliente: "Pedro Gómez",
      comentarios: "Venta realizada online",
    },
    {
      id: 2,
      producto: "Detergente XYZ",
      categoria: "Limpieza",
      cantidad: 5,
      fechaSalida: "08/10/2024",
      motivo: "Devolución",
      responsable: "Carlos Ruiz",
      precioVenta: null,
      cliente: null,
      comentarios: "Producto defectuoso",
    },
  ];
  return <Salidas salidas={salidasData} />;
}

export default DataSalida;
