import React, { useState, useEffect } from "react";
import { fetchClientes } from "@/api/cliente.api"; // Asegúrate de definir esta función en tu API

const ClienteForm = ({ setCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  useEffect(() => {
    const obtenerClientes = async () => {
      const data = await fetchClientes(); // Asegúrate de tener esta función definida
      setClientes(data);
    };

    obtenerClientes();
  }, []);

  const handleSelect = (e) => {
    const clienteId = e.target.value;
    const cliente = clientes.find((c) => c.id_cliente === parseInt(clienteId));
    setCliente(cliente);
    setClienteSeleccionado(clienteId);
  };

  return (
    <div>
      <h2>Seleccionar Cliente</h2>
      <select value={clienteSeleccionado} onChange={handleSelect}>
        <option value="">Selecciona un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id_cliente} value={cliente.id_cliente}>
            {cliente.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClienteForm;
