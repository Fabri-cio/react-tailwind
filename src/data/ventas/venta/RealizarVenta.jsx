import React, { useState, useMemo, useEffect } from "react";
import { useInventarios, useClientes } from "../../../hooks/useEntities";
import CreateCliente from "../cliente/CreateCliente";
import {
  Modal,
  ActionButton,
  InputField,
  Table,
} from "../../../components/shared";
import { FaTrash, FaPlus, FaSync, FaTimes, FaCheck } from "react-icons/fa";
import { useVentaMutations } from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { toast } from "react-hot-toast";

function RealizarVenta() {
  const { manejarEnvio } = useFormEntity();
  const { crear: createMutation } = useVentaMutations();
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
  const [codigo, setCodigo] = useState(""); // estado para el codigo de producto
  const [busquedaNombre, setBusquedaNombre] = useState(""); // estado para la búsqueda de nombre
  const [items, setItems] = useState([]); // estado para los items del carrito
  const [descuentoGlobal, setDescuentoGlobal] = useState(0); // estado para el descuento global
  const [loading, setLoading] = useState(false); // estado para el loading
  const [quiereComprobante, setQuiereComprobante] = useState(false); // estado para el comprobante
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // estado para el cliente seleccionado
  const [showModalCliente, setShowModalCliente] = useState(false); // estado para el modal de clientes
  const [showModalVenta, setShowModalVenta] = useState(false); // estado para el modal de venta
  const [busquedaCliente, setBusquedaCliente] = useState(""); // estado para la búsqueda de clientes
  const [cargarClientes, setCargarClientes] = useState(false); // estado para cargar clientes
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false); // estado para el modal de confirmación

  // Cargar clientes solo cuando se marque el checkbox
  const { data: clientesData = [] } = useClientes(
    { all_data: true },
    cargarClientes
  );

  // --------------------
  // Selección automática de productos
  // --------------------
  useEffect(() => {
    if (!busquedaNombre) return;

    const prod = productos.find(
      (p) => p.producto_nombre.toLowerCase() === busquedaNombre.toLowerCase()
    );
    if (!prod) return;

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

    setBusquedaNombre(""); // limpiar input
    toast.success(`Producto "${prod.producto_nombre}" agregado al carrito`);
  }, [busquedaNombre, productos]);

  // --------------------
  // Selección automática de clientes
  // --------------------
  useEffect(() => {
    if (!busquedaCliente) return;

    const cliente = clientesData.find(
      (c) => c.nombre.toLowerCase() === busquedaCliente.toLowerCase()
    );

    if (cliente && clienteSeleccionado?.id !== cliente.id) {
      setClienteSeleccionado(cliente);
      toast.success("Cliente seleccionado correctamente");
    }
  }, [busquedaCliente, clientesData]);

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

  // Guardar en localStorage
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
    if (!prod) return toast.error("Producto no encontrado por código");
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

  const eliminarItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  // Totales
  const subtotalGeneral = items.reduce(
    (acc, i) => acc + i.precio * i.cantidad,
    0
  );
  const descuentoProductos = items.reduce((acc, i) => acc + i.descuento, 0);
  const totalFinal = subtotalGeneral - (descuentoProductos + descuentoGlobal);

  // funcion que abre el modal de confirmacion
  const limpiarCarritoManual = () => {
    setShowModalConfirmacion(true);
  };

  // confirmar desde el modal
  const confirmarLimpiarCarrito = () => {
    limpiarCarritoAutomatico();
    setShowModalConfirmacion(false);
    toast.success("Carrito vaciado correctamente");
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

  // Función para confirmar venta usando manejarEnvio
  const confirmarVenta = (event) => {
    setLoading(true);

    manejarEnvio(
      event,
      null, // nombre de la entidad (para navegación si aplica)
      {
        cliente: clienteSeleccionado?.id || null,
        descuento: descuentoGlobal,
        quiere_comprobante: quiereComprobante,
        detalles: items.map((i) => ({
          inventario: i.id,
          cantidad: i.cantidad,
          precio_unitario: i.precio,
          descuento_unitario: i.descuento,
        })),
      },
      createMutation, // mutación de creación
      null, // no se usa updateMutation
      null, // no se pasa entityId
      {
        // Callbacks adicionales
        onSuccess: () => {
          limpiarCarritoAutomatico(); // limpia carrito
          setShowModalVenta(false); // cierra modal
          setLoading(false); // detiene loading
        },
        onError: () => {
          setLoading(false); // detiene loading en caso de error
        },
      }
    );
  };

  // Guardar cliente desde CreateCliente
  const handleGuardarCliente = (clienteNuevo) => {
    setClienteSeleccionado(clienteNuevo);
    setShowModalCliente(false);
  };

  // -----------------------
  // Definición de campos para la tabla reutilizable
  // -----------------------
  const fields = [
    {
      key: "imagen",
      label: "Imagen",
      render: (item) =>
        item.imagen ? (
          <img
            src={`${item.imagen}?t=${new Date().getTime()}`}
            alt={item.nombre}
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
            Sin imagen
          </div>
        ),
    },
    { key: "nombre", label: "Producto" },
    {
      key: "cantidad",
      label: "Cantidad",
      render: (item, index) => (
        <InputField
          type="number"
          value={item.cantidad}
          min={1}
          max={item.stockDisponible}
          onChange={(e) => actualizarCantidad(index, e.target.value)}
          className="w-16"
        />
      ),
    },
    {
      key: "precio",
      label: "Precio",
      render: (item) => item.precio.toFixed(2),
    },
    {
      key: "descuento",
      label: "Descuento",
      render: (item, index) => (
        <InputField
          type="number"
          value={item.descuento}
          min={0}
          max={item.precio * item.cantidad}
          step="0.1"
          onChange={(e) => actualizarDescuento(index, e.target.value)}
          className="w-17 "
        />
      ),
    },
    {
      key: "subtotal",
      label: "Subtotal",
      render: (item) =>
        (item.precio * item.cantidad - item.descuento).toFixed(2),
    },
    {
      key: "acciones",
      label: "Acción",
      render: (_, index) => (
        <ActionButton
          icon={FaTrash}
          onClick={() => eliminarItem(index)}
          estilos="px-2 py-1 bg-red-500 text-white rounded"
        />
      ),
    },
  ];

  const fieldsModalVenta = [
    {
      key: "imagen",
      label: "Imagen",
      render: (item) =>
        item.imagen ? (
          <img
            src={`${item.imagen}?t=${new Date().getTime()}`}
            alt={item.nombre}
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
            Sin imagen
          </div>
        ),
    },
    { key: "nombre", label: "Producto" },
    { key: "cantidad", label: "Cantidad" },
    {
      key: "precio",
      label: "Precio",
      render: (item) => item.precio.toFixed(2),
    },
    {
      key: "descuento",
      label: "Descuento",
      render: (item) => item.descuento.toFixed(2),
    },
    {
      key: "subtotal",
      label: "Subtotal",
      render: (item) =>
        (item.precio * item.cantidad - item.descuento).toFixed(2),
    },
  ];

  // Creamos footerData para los totales
  const footerData = [
    {
      key: "subtotalProductos",
      label: "Subtotal productos:",
      value: subtotalGeneral,
    },
    {
      key: "descuentoProductos",
      label: "Descuento productos:",
      value: descuentoProductos,
    },
    {
      key: "descuentoGlobal",
      label: "Descuento global:",
      value: descuentoGlobal,
    },
    { key: "totalFinal", label: "Total final:", value: totalFinal },
  ];

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
        Punto de Venta
      </h1>

      {/* Código de barras */}
      <InputField
        name="codigo"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProductoPorCodigo()}
        placeholder="Código de barras"
        className="w-1/2 mb-2"
        autoFocus
      />

      {/* Búsqueda por nombre */}
      <div className="flex mb-4 space-x-2">
        <InputField
          type="text"
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
          placeholder="Buscar producto por nombre"
          list="productos-sugeridos"
          className="w-1/2"
        />
        <datalist id="productos-sugeridos">
          {productos
            .filter((p) =>
              p.producto_nombre
                .toLowerCase()
                .includes(busquedaNombre.toLowerCase())
            )
            .map((p) => (
              <option key={p.id} value={p.producto_nombre} />
            ))}
        </datalist>
      </div>

      {/* Layout dos columnas */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Tabla de productos */}
        <div className="md:w-2/3">
          <Table items={items} fields={fields} />
        </div>

        {/* Resumen y botones */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {/* Contenedor de resumen */}
          <div className="p-4 border rounded bg-gray-50 space-y-2">
            {/* Subtotales */}
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotalGeneral.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Descuento productos:</span>
              <span>{descuentoProductos.toFixed(2)}</span>
            </div>
            {/* Descuento global */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="font-medium">Descuento global:</label>
              <InputField
                type="number"
                value={descuentoGlobal}
                min={0}
                max={subtotalGeneral - descuentoProductos}
                onChange={(e) => actualizarDescuentoGlobal(e.target.value)}
                className="w-full sm:w-24 h-10"
                step="0.1"
              />
            </div>
            {/* Total final */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total final:</span>
              <span>{totalFinal.toFixed(2)}</span>
            </div>
            {/* Checkbox comprobante */}
            <label className="flex items-center space-x-2">
              <InputField
                type="checkbox"
                checked={quiereComprobante}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setQuiereComprobante(checked);
                  if (checked) setCargarClientes(true);
                  else {
                    setClienteSeleccionado(null);
                    setBusquedaCliente("");
                    setCargarClientes(false);
                  }
                }}
                className="w-4 h-4"
              />
              <span>¿Desea comprobante?</span>
            </label>

            {/* Inputs de cliente solo si se activa comprobante */}
            {quiereComprobante && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-2 gap-2">
                <InputField
                  type="text"
                  name="busquedaCliente"
                  value={busquedaCliente}
                  onChange={(e) => setBusquedaCliente(e.target.value)}
                  placeholder="Buscar cliente por nombre"
                  list="clientes-sugeridos"
                  className="flex-1"
                />

                <datalist id="clientes-sugeridos">
                  {clientesData
                    .filter((c) =>
                      c.nombre
                        .toLowerCase()
                        .includes(busquedaCliente.toLowerCase())
                    )
                    .map((c) => (
                      <option key={c.id} value={c.nombre} />
                    ))}
                </datalist>

                <ActionButton
                  icon={FaTrash}
                  onClick={() => {
                    setClienteSeleccionado(null);
                    setBusquedaCliente("");
                    toast("Cliente eliminado", { icon: "🗑️" });
                  }}
                  estilos="px-2 py-1 bg-red-500 text-white rounded"
                  title="Eliminar cliente seleccionado"
                />
                <ActionButton
                  icon={FaPlus}
                  onClick={() => setShowModalCliente(true)}
                  estilos="px-2 py-1 bg-green-500 text-white rounded"
                  title="Crear nuevo cliente"
                />
                <ActionButton
                  icon={FaSync}
                  onClick={() => setCargarClientes((prev) => !prev)}
                  estilos="px-2 py-1 bg-blue-500 text-white rounded"
                  title="Refrescar lista de clientes"
                />
              </div>
            )}
          </div>

          {/* Botón limpiar carrito */}
          <ActionButton
            label="Limpiar carrito"
            onClick={limpiarCarritoManual}
            estilos="justify-center px-4 py-2 bg-gray-500 text-white rounded"
          />

          {/* modal de comfirmacion */}
          {/* Modal de confirmación */}
          {showModalConfirmacion && (
            <Modal onClose={() => setShowModalConfirmacion(false)}>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">Confirmar acción</h2>
                <p className="mb-4">
                  ¿Está seguro que desea limpiar todo el carrito? Se perderán
                  todos los productos agregados.
                </p>

                <div className="flex justify-end space-x-2">
                  <ActionButton
                    icon={FaTimes}
                    onClick={() => setShowModalConfirmacion(false)}
                    estilos="px-4 py-2 bg-gray-300 rounded"
                    title="Cancelar"
                  />
                  <ActionButton
                    icon={FaCheck}
                    onClick={confirmarLimpiarCarrito}
                    estilos="px-4 py-2 bg-red-500 text-white rounded"
                    title="Confirmar"
                  />
                </div>
              </div>
            </Modal>
          )}

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
          </div>

          {clienteSeleccionado && (
            <p className="mb-2">Cliente: {clienteSeleccionado.nombre}</p>
          )}

          {/* tabla reutilizable */}
          <Table
            items={items}
            fields={fieldsModalVenta}
            footer={footerData.map((f) => (
              <tr key={f.key}>
                {/* Etiqueta en la celda anterior, alineada a la derecha */}
                <td
                  colSpan={fieldsModalVenta.length - 1}
                  className="text-right font-bold pr-2"
                >
                  {f.label}
                </td>
                {/* Valor en la última celda */}
                <td className="">
                  {f.value.toFixed(2)}
                </td>
              </tr>
            ))}
          />

          <div className="flex justify-end space-x-2 mt-4">
            <ActionButton
              onClick={() => setShowModalVenta(false)}
              disabled={loading}
              icon={FaTimes}
              estilos="px-4 py-2 bg-red-500 rounded text-white"
            />
            <ActionButton
              onClick={confirmarVenta}
              disabled={loading}
              icon={FaCheck}
              estilos="px-4 py-2 bg-green-500 rounded text-white"
            />
            {loading && "Procesando..."}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RealizarVenta;
