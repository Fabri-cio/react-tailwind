import React, { useState, useMemo, useEffect } from "react";
import { useInventarios, useClientes } from "../../../hooks/useEntities";
import CreateCliente from "../cliente/CreateCliente";
import Modal from "../../../components/shared/Modal";
import { FaTrash } from "react-icons/fa";

function RealizarVenta() {
  const { data: productos = [] } = useInventarios({ all_data: true });

  const productosMap = useMemo(() => {
    const map = {};
    productos.forEach((p) => {
      map[p.producto_barcode] = p;
      if (p.codigosAdicionales && Array.isArray(p.codigosAdicionales)) {
        p.codigosAdicionales.forEach((c) => (map[c] = p));
      }
    });
    return map;
  }, [productos]);

  // Estados principales
  const [codigo, setCodigo] = useState("");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [items, setItems] = useState([]);
  const [descuentoGlobal, setDescuentoGlobal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quiereComprobante, setQuiereComprobante] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalVenta, setShowModalVenta] = useState(false);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [cargarClientes, setCargarClientes] = useState(false);

  // Cargar clientes solo cuando se marque el checkbox
  const { data: clientesData = [] } = useClientes(
    { all_data: true },
    cargarClientes
  );

  // Persistencia localStorage
  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem("ventaItems") || "[]");
      const savedDescuento = parseFloat(
        localStorage.getItem("ventaDescuentoGlobal") || "0"
      );
      if (Array.isArray(savedItems) && savedItems.length) setItems(savedItems);
      if (!isNaN(savedDescuento)) setDescuentoGlobal(savedDescuento);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("ventaItems", JSON.stringify(items));
    localStorage.setItem("ventaDescuentoGlobal", descuentoGlobal);
  }, [items, descuentoGlobal]);

  // Funciones de productos
  const actualizarCantidad = (index, val) => {
    const cantidad = Math.max(1, parseInt(val) || 1);
    setItems((prev) => {
      const copy = [...prev];
      if (cantidad > copy[index].stockDisponible) {
        alert(
          `No hay suficiente stock para "${copy[index].nombre}". Máximo: ${copy[index].stockDisponible}`
        );
        return prev;
      }
      copy[index].cantidad = cantidad;
      if (copy[index].descuento > copy[index].precio * cantidad)
        copy[index].descuento = copy[index].precio * cantidad;
      return copy;
    });
  };

  const actualizarDescuento = (index, val) => {
    setItems((prev) => {
      const copy = [...prev];
      const subtotal = copy[index].precio * copy[index].cantidad;
      copy[index].descuento = Math.min(
        Math.max(0, parseFloat(val) || 0),
        subtotal
      );
      return copy;
    });
  };

  const actualizarDescuentoGlobal = (val) => {
    const subtotalGeneral = items.reduce(
      (acc, i) => acc + i.precio * i.cantidad,
      0
    );
    const descuentoProductos = items.reduce((acc, i) => acc + i.descuento, 0);
    const maxDescuento = subtotalGeneral - descuentoProductos;
    setDescuentoGlobal(
      Math.min(Math.max(0, parseFloat(val) || 0), maxDescuento)
    );
  };

  const agregarProductoPorCodigo = () => {
    if (!codigo.trim()) return;
    const prod = productosMap[codigo.trim()];
    if (!prod) return alert("Producto no encontrado por código");
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === prod.id);
      if (index !== -1) {
        const copy = [...prev];
        if (copy[index].cantidad + 1 > copy[index].stockDisponible) {
          alert(`No hay suficiente stock para "${copy[index].nombre}".`);
          return prev;
        }
        copy[index].cantidad += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: prod.id,
          nombre: prod.producto_nombre,
          cantidad: 1,
          precio: parseFloat(prod.precio),
          descuento: 0,
          stockDisponible: prod.cantidad,
          imagen: prod.imagen,
        },
      ];
    });
    setCodigo("");
  };

  const agregarProductoPorNombre = (nombre) => {
    const nombreNormalized = nombre.trim().toLowerCase();
    const prod = productos.find(
      (p) => p.producto_nombre.toLowerCase() === nombreNormalized
    );
    if (!prod) return alert("Producto no encontrado por nombre");
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === prod.id);
      if (index !== -1) {
        const copy = [...prev];
        if (copy[index].cantidad + 1 > copy[index].stockDisponible) {
          alert(`No hay suficiente stock para "${copy[index].nombre}".`);
          return copy;
        }
        copy[index].cantidad += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: prod.id,
          nombre: prod.producto_nombre,
          cantidad: 1,
          precio: parseFloat(prod.precio),
          descuento: 0,
          stockDisponible: prod.cantidad,
          imagen: prod.imagen,
        },
      ];
    });
    setBusquedaNombre("");
  };

  const eliminarItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  // Totales
  const subtotalGeneral = items.reduce(
    (acc, i) => acc + i.precio * i.cantidad,
    0
  );
  const descuentoProductos = items.reduce((acc, i) => acc + i.descuento, 0);
  const totalFinal = subtotalGeneral - (descuentoProductos + descuentoGlobal);

  // Filtrados
  const productosFiltrados = productos.filter((p) =>
    p.producto_nombre.toLowerCase().includes(busquedaNombre.toLowerCase())
  );
  const clientesFiltrados = (clientesData || []).filter((c) =>
    c.nombre.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  // Funciones de limpieza
  const limpiarCarritoManual = () => {
    if (!window.confirm("¿Desea limpiar todo el carrito?")) return;
    limpiarCarritoAutomatico();
  };

  const limpiarCarritoAutomatico = () => {
    setItems([]);
    setDescuentoGlobal(0);
    setClienteSeleccionado(null);
    setBusquedaCliente("");
    setQuiereComprobante(false);
    setCargarClientes(false);
    localStorage.removeItem("ventaItems");
    localStorage.removeItem("ventaDescuentoGlobal");
  };

  // Venta
  const handleFinalizarClick = () => {
    if (!items.length) return alert("No hay productos para vender.");
    setShowModalVenta(true);
  };

  const confirmarVenta = async () => {
    setLoading(true);
    try {
      alert(
        `Venta realizada con éxito${
          clienteSeleccionado ? ` a ${clienteSeleccionado.nombre}` : ""
        }`
      );
      limpiarCarritoAutomatico(); // Limpieza automática sin preguntar
      setShowModalVenta(false);
    } catch {
      alert("Error al realizar la venta");
    } finally {
      setLoading(false);
    }
  };

  // Guardar cliente desde CreateCliente
  const handleGuardarCliente = (clienteNuevo) => {
    setClienteSeleccionado(clienteNuevo);
    setShowModalCliente(false);
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
        Punto de Venta
      </h1>

      {/* Código de barras */}
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProductoPorCodigo()}
        placeholder="Código de barras"
        className="w-1/2 border p-2 rounded mb-2"
        autoFocus
      />

      {/* Búsqueda por nombre */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
          placeholder="Buscar producto por nombre"
          list="productos-sugeridos"
          className="w-1/2 border p-2 rounded"
        />
        <datalist id="productos-sugeridos">
          {productosFiltrados.map((p) => (
            <option key={p.id} value={p.producto_nombre} />
          ))}
        </datalist>
        <button
          onClick={() => agregarProductoPorNombre(busquedaNombre)}
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          Agregar
        </button>
      </div>

      {/* Layout dos columnas */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Tabla de productos */}
        <div className="md:w-2/3">
          <table className="w-full border-collapse border mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Imagen</th>
                <th className="border p-2">Producto</th>
                <th className="border p-2">Cantidad</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Descuento</th>
                <th className="border p-2">Subtotal</th>
                <th className="border p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={i.id}>
                  <td className="border p-2">
                    {i.imagen ? (
                      <img
                        src={`${i.imagen}?t=${new Date().getTime()}`}
                        alt={i.nombre}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                        Sin imagen
                      </div>
                    )}
                  </td>
                  <td className="border p-2">{i.nombre}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={i.cantidad}
                      min={1}
                      max={i.stockDisponible}
                      onChange={(e) => actualizarCantidad(idx, e.target.value)}
                      className="w-16 border p-1 rounded"
                    />
                  </td>
                  <td className="border p-2">{i.precio.toFixed(2)}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={i.descuento}
                      min={0}
                      max={i.precio * i.cantidad}
                      onChange={(e) => actualizarDescuento(idx, e.target.value)}
                      className="w-20 border p-1 rounded"
                      step="0.1"
                    />
                  </td>
                  <td className="border p-2">
                    {(i.precio * i.cantidad - i.descuento).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => eliminarItem(idx)}
                      className="px-2 py-1 bg-red-500 text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen y botones */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="p-4 border rounded bg-gray-50 space-y-2">
            <p>Subtotal: {subtotalGeneral.toFixed(2)}</p>
            <p>Descuento productos: {descuentoProductos.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <label>Descuento global:</label>
              <input
                type="number"
                value={descuentoGlobal}
                min={0}
                max={subtotalGeneral - descuentoProductos}
                onChange={(e) => actualizarDescuentoGlobal(e.target.value)}
                className="w-24 border p-1 rounded"
              />
            </div>
            <p>Total final: {totalFinal.toFixed(2)}</p>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiereComprobante}
                onChange={(e) => {
                  setQuiereComprobante(e.target.checked);
                  if (e.target.checked) setCargarClientes(true);
                }}
                className="w-4 h-4"
              />
              <span>¿Desea comprobante?</span>
            </label>

            {quiereComprobante && (
              <div className="mt-2 space-y-2">
                <button
                  onClick={() => setShowModalCliente(true)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Crear Cliente
                </button>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={busquedaCliente}
                    onChange={(e) => setBusquedaCliente(e.target.value)}
                    placeholder="Buscar cliente por nombre"
                    list="clientes-sugeridos"
                    className="flex-1 border p-2 rounded"
                  />
                  <datalist id="clientes-sugeridos">
                    {clientesFiltrados.map((c) => (
                      <option key={c.id} value={c.nombre} />
                    ))}
                  </datalist>
                  <button
                    onClick={() => {
                      const cliente = clientesData.find(
                        (c) =>
                          c.nombre.toLowerCase() ===
                          busquedaCliente.toLowerCase()
                      );
                      if (!cliente) return alert("Cliente no encontrado");
                      setClienteSeleccionado(cliente);
                      setBusquedaCliente("");
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded"
                  >
                    Seleccionar
                  </button>
                </div>

                {clienteSeleccionado && (
                  <p className="mt-2 text-green-700 font-semibold">
                    Cliente seleccionado: {clienteSeleccionado.nombre}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Botón limpiar carrito */}
          <button
            onClick={limpiarCarritoManual}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Limpiar carrito
          </button>

          {/* Botón finalizar venta */}
          <button
            onClick={handleFinalizarClick}
            disabled={!items.length || loading}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {loading ? "Procesando..." : "Finalizar venta"}
          </button>
        </div>
      </div>

      {/* Modal Cliente */}
      {showModalCliente && (
        <Modal onClose={() => setShowModalCliente(false)}>
          <CreateCliente onSave={handleGuardarCliente} />
        </Modal>
      )}

      {/* Modal Venta */}
      {showModalVenta && (
        <Modal onClose={() => setShowModalVenta(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Factura de la Venta</h2>
            <button
              onClick={() => setShowModalVenta(false)}
              className="font-bold text-gray-700 hover:text-black"
            >
              X
            </button>
          </div>

          {clienteSeleccionado && (
            <p className="mb-2">Cliente: {clienteSeleccionado.nombre}</p>
          )}

          <table className="w-full border-collapse border mb-2 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Imagen</th>
                <th className="border p-2">Producto</th>
                <th className="border p-2">Cantidad</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Descuento</th>
                <th className="border p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td className="border p-2">
                    {i.imagen ? (
                      <img
                        src={`${i.imagen}?t=${new Date().getTime()}`}
                        alt={i.nombre}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                        Sin imagen
                      </div>
                    )}
                  </td>
                  <td className="border p-2">{i.nombre}</td>
                  <td className="border p-2">{i.cantidad}</td>
                  <td className="border p-2">{i.precio.toFixed(2)}</td>
                  <td className="border p-2">{i.descuento.toFixed(2)}</td>
                  <td className="border p-2">
                    {(i.precio * i.cantidad - i.descuento).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right font-bold">
                  Subtotal productos:
                </td>
                <td className="border p-2">{subtotalGeneral.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" className="text-right font-bold">
                  Descuento productos:
                </td>
                <td className="border p-2">{descuentoProductos.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" className="text-right font-bold">
                  Descuento global:
                </td>
                <td className="border p-2">{descuentoGlobal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" className="text-right font-bold text-lg">
                  Total final:
                </td>
                <td className="border p-2 text-lg">{totalFinal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setShowModalVenta(false)}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarVenta}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {loading ? "Procesando..." : "Confirmar venta"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RealizarVenta;
