import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Table,
  InputField,
  ActionButton,
  Modal,
} from "../../../components/shared";
import { FaTimes, FaCheck, FaPlus, FaSync, FaTrash } from "react-icons/fa";
import {
  useInventarios,
  usePedidoRecepcion,
  useProveedores,
} from "../../../hooks/useEntities";
import toast from "react-hot-toast";
import { useFormEntity } from "../../../utils/useFormEntity";
import { usePedidoMutations } from "../../../hooks/useEntities";
import { useParams } from "react-router-dom";

export default function Pedido() {
  const { id } = useParams();
  const { data: pedido = {} } = usePedidoRecepcion(id);

  const { manejarEnvio } = useFormEntity();
  const { crear: createMutation } = usePedidoMutations();
  const { data: productosInventario = [] } = useInventarios({ all_data: true });

  const [fechaEntrega, setFechaEntrega] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [proveedorBusqueda, setProveedorBusqueda] = useState("");
  const [highlightProveedor, setHighlightProveedor] = useState(0);
  const [loading, setLoading] = useState(false);

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoBusqueda, setProductoBusqueda] = useState("");
  const [highlightProducto, setHighlightProducto] = useState(0);

  const [observaciones, setObservaciones] = useState("");
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [pedidoProveedor, setPedidoProveedor] = useState(false);
  const [cargarProveedores, setCargarProveedores] = useState(false);

  const proveedorRefs = useRef([]);
  const productoRefs = useRef([]);

  const { data: proveedores = [] } = useProveedores(
    { all_data: true },
    cargarProveedores
  );

  // -------- Debounce --------
  const [productoDebounce, setProductoDebounce] = useState("");
  const [proveedorDebounce, setProveedorDebounce] = useState("");

  //si viene un pedido existente se llena el formulario
  useEffect(() => {
    if (pedido && pedido.id) {
      //activar checkbox de proveedor
      if (pedido.proveedor) {
        setPedidoProveedor(true);
        setCargarProveedores(true);
      }

      //fecha de entrega
      setFechaEntrega(pedido.fecha_entrega || "");

      //observaciones
      setObservaciones(pedido.observaciones || "");

      //proveedor
      if (pedido.proveedor && pedido.nombre_proveedor) {
        setProveedorSeleccionado({
          id: pedido.proveedor,
          marca: pedido.nombre_proveedor,
          imagen: pedido.imagen_proveedor,
        });
        setProveedorBusqueda(pedido.nombre_proveedor);
      }

      //productos
      if (pedido.detalles && pedido.detalles.length > 0) {
        const productoPrefill = pedido.detalles.map((d) => ({
          id: d.producto,
          producto_nombre: d.producto_nombre,
          imagen: d.producto_imagen,
          cantidad: parseFloat(d.cantidad_solicitada),
        }));
        setProductosSeleccionados(productoPrefill);
      }
    }
  }, [pedido]);

  // -------- DEBOUNCE --------
  useEffect(() => {
    const timer = setTimeout(() => setProductoDebounce(productoBusqueda), 300);
    return () => clearTimeout(timer);
  }, [productoBusqueda]);

  //proveedor
  useEffect(() => {
    const timer = setTimeout(
      () => setProveedorDebounce(proveedorBusqueda),
      300
    );
    return () => clearTimeout(timer);
  }, [proveedorBusqueda]);

  // -------- FILTRADO CON DEBOUNCE --------
  const proveedoresFiltrados = useMemo(() => {
    return proveedores.filter((p) =>
      p.marca.toLowerCase().includes(proveedorDebounce.toLowerCase())
    );
  }, [proveedorDebounce, proveedores]);

  //productos
  const productosFiltrados = useMemo(() => {
    return productosInventario.filter((p) =>
      p.producto_nombre.toLowerCase().includes(productoDebounce.toLowerCase())
    );
  }, [productoDebounce, productosInventario]);

  // -------- SELECCIÓN Y AGREGAR --------
  const seleccionarProveedor = (p) => {
    setProveedorSeleccionado(p);
    setProveedorBusqueda(p.marca);
  };

  //agregar producto
  const agregarProducto = (prod) => {
    const existe = productosSeleccionados.find((p) => p.id === prod.id);
    if (existe) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.id === prod.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setProductosSeleccionados((prev) => [...prev, { ...prod, cantidad: 1 }]);
    }
    setProductoBusqueda("");
  };

  //eliminar producto
  const eliminarProducto = (index) => {
    setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  //actualizar cantidad
  const actualizarCantidad = (index, key, val) => {
    const cantidad = Math.max(1, parseInt(val) || 1);
    setProductosSeleccionados((prev) => {
      const copy = [...prev];
      copy[index].cantidad = cantidad;
      return copy;
    });
  };

  const actualizarCampo = (index, key, val) => {
    setProductosSeleccionados((prev) => {
      const copy = [...prev];
      copy[index][key] = val;
      return copy;
    });
  };

  const confirmarPedido = (event) => {
    setLoading(true);

    manejarEnvio(
      event,
      null, // nombre de la entidad (para navegación si aplica)
      {
        proveedor: proveedorSeleccionado ? proveedorSeleccionado.id : null,
        fecha_entrega: fechaEntrega || null,
        observaciones: observaciones || "",
        detalles: productosSeleccionados.map((p) => ({
          producto: p.id,
          cantidad_solicitada: p.cantidad,
        })),
      },
      createMutation,
      null,
      null,
      {
        onSuccess: () => {
          toast.success("Pedido guardado correctamente");
          limpiarPedido();
          setShowModalConfirmacion(false);
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
        },
      }
    );
  };

  //abrir modal confirmacion
  const abrirModalConfirmacion = () => {
    if (!fechaEntrega || productosSeleccionados.length === 0) {
      return toast.error("Completa todos los campos y agrega productos.");
    }
    setShowModalConfirmacion(true);
  };

  const limpiarPedido = () => {
    setFechaEntrega("");
    setProveedorSeleccionado(null);
    setProveedorBusqueda("");
    setProductosSeleccionados([]);
    setProductoBusqueda("");
    setObservaciones("");
    setHighlightProducto(0);
    setHighlightProveedor(0);
    setPedidoProveedor(false);
    setCargarProveedores(false);
    toast.success("Pedido limpiado correctamente");
  };

  // -------- TABLA --------
  const fields = [
    {
      key: "imagen",
      label: "Imagen",
      render: (item) => (
        <img
          src={item.imagen}
          alt={item.producto_nombre}
          className="w-12 h-12 rounded"
        />
      ),
    },
    { key: "producto_nombre", label: "Producto" },
    {
      key: "cantidad",
      label: "Cantidad",
      render: (item, index) => (
        <InputField
          type="number"
          value={item.cantidad}
          min={1}
          onChange={(e) => actualizarCantidad(index, e.target.value)}
          className="w-14"
        />
      ),
    },
    ...(pedido.id
      ? [
          {
            key: "cantidad_recibida",
            label: "Cantidad Recibida",
            render: (item, index) => (
              <InputField
                type="number"
                value={item.cantidad_recibida || 0}
                min={0}
                onChange={(e) => actualizarCampo(index, "cantidad_recibida", e.target.value)}
                className="w-14"
                step="0.1"
              />
            ),
          },
          {
            key: "precio_unitario",
            label: "Precio Unitario",
            render: (item, index) => (
              <InputField
                type="number"
                value={item.precio_unitario || 0}
                min={0}
                onChange={(e) => actualizarCampo(index, "precio_unitario", e.target.value)}
                className="w-14"
                step="0.1"
              />
            ),
          },
          {
            key: "descuento_unitario",
            label: "Descuento Unitario",
            render: (item, index) => (
              <InputField
                type="number"
                value={item.descuento_unitario || 0}
                min={0.0}
                onChange={(e) => actualizarCampo(index, "descuento_unitario", e.target.value)}
                className="w-14"
                step="0.1"
              />
            ),
          },
          {
            key: "subtotal",
            label: "Subtotal",
            render: (item, index) => (
              <InputField
                type="number"
                value={item.subtotal || 0}
                min={0}
                onChange={(e) => actualizarCampo(index, "subtotal", e.target.value)}
                className="w-14"
              />
            ),
          },
        ]
      : []),
    {
      key: "acciones",
      label: "Acción",
      render: (_, index) => (
        <ActionButton
          icon={FaTimes}
          onClick={() => eliminarProducto(index)}
          estilos="bg-red-500 text-white rounded"
          title="Eliminar producto de la lista"
        />
      ),
    },
  ];

  // -------- TABLA MODAL CONFIRMACION --------
  const fieldsModalConfirmacion = [
    {
      key: "imagen",
      label: "Imagen",
      render: (item) =>
        item.imagen ? (
          <img
            src={`${item.imagen}?t=${new Date().getTime()}`}
            alt={item.producto_nombre}
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
            Sin imagen
          </div>
        ),
    },
    { key: "producto_nombre", label: "Producto" },
    { key: "cantidad", label: "Cantidad" },
  ];

  // -------- TECLADO PRODUCTO --------
  const handleProductoKey = (e) => {
    if (!productosFiltrados.length) return;
    if (e.key === "ArrowDown")
      setHighlightProducto((prev) => (prev + 1) % productosFiltrados.length);
    else if (e.key === "ArrowUp")
      setHighlightProducto((prev) =>
        prev === 0 ? productosFiltrados.length - 1 : prev - 1
      );
    else if (e.key === "Enter" && highlightProducto >= 0)
      agregarProducto(productosFiltrados[highlightProducto]);
  };

  // -------- TECLADO PROVEEDOR --------
  const handleProveedorKey = (e) => {
    if (!proveedoresFiltrados.length) return;
    if (e.key === "ArrowDown")
      setHighlightProveedor((prev) => (prev + 1) % proveedoresFiltrados.length);
    else if (e.key === "ArrowUp")
      setHighlightProveedor((prev) =>
        prev === 0 ? proveedoresFiltrados.length - 1 : prev - 1
      );
    else if (e.key === "Enter" && highlightProveedor >= 0)
      seleccionarProveedor(proveedoresFiltrados[highlightProveedor]);
  };

  // -------- SCROLL AUTOMÁTICO --------
  useEffect(() => {
    if (productoRefs.current[highlightProducto])
      productoRefs.current[highlightProducto]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
  }, [highlightProducto]);

  //proveedor
  useEffect(() => {
    if (proveedorRefs.current[highlightProveedor])
      proveedorRefs.current[highlightProveedor].scrollIntoView({
        block: "nearest",
      });
  }, [highlightProveedor]);

  // -------- JSX --------
  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
        {pedido.id ? "Recepcionar Pedido" : "Nuevo Pedido"}
      </h1>

      {/* Autocomplete Producto */}
      <div className="relative w-1/2 mb-4">
        <InputField
          type="text"
          placeholder="Buscar producto"
          value={productoBusqueda}
          onChange={(e) => setProductoBusqueda(e.target.value)}
          onKeyDown={handleProductoKey}
          className="w-full"
        />
        {productoBusqueda && productosFiltrados.length > 0 && (
          <ul className="absolute z-50 bg-white border rounded w-full max-h-60 overflow-y-auto mt-1 shadow-lg">
            {productosFiltrados.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => (productoRefs.current[i] = el)}
                onClick={() => agregarProducto(p)}
                className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                  i === highlightProducto ? "bg-gray-200" : ""
                }`}
              >
                <img
                  src={p.imagen}
                  alt={p.producto_nombre}
                  className="w-8 h-8 rounded"
                />
                <div>
                  <p className="text-sm font-medium">{p.producto_nombre}</p>
                  <p className="text-xs text-gray-500">Precio: ${p.precio}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Layout dos columnas */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <Table items={productosSeleccionados} fields={fields} />
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="p-4 border rounded bg-gray-50 space-y-2">
            {/* checkbox pedido proveedor */}
            <label className="flex items-center space-x-2">
              <InputField
                type="checkbox"
                checked={pedidoProveedor}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setPedidoProveedor(checked);
                  if (checked) setCargarProveedores(true);
                  else {
                    setProveedorSeleccionado(null);
                    setProveedorBusqueda("");
                    setCargarProveedores(false);
                  }
                }}
                className="w-4 h-4"
              />
              <span>¿necesita un proveedor?</span>
            </label>

            {pedidoProveedor && (
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2">
                {/* Mostrar proveedor seleccionado como chip */}
                {proveedorSeleccionado ? (
                  <div className="flex items-center gap-2 border rounded px-2 h-10 bg-gray-100 flex-1 min-w-[120px]">
                    <img
                      src={proveedorSeleccionado.imagen}
                      alt={proveedorSeleccionado.marca}
                      className="w-6 h-6 rounded"
                    />
                    <span className="text-sm truncate">
                      {proveedorSeleccionado.marca}
                    </span>
                    {!pedido.proveedor && (
                      <button
                        onClick={() => {
                          setProveedorSeleccionado(null);
                          setProveedorBusqueda("");
                        }}
                        className="text-red-500 font-bold px-1"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="relative flex-1 min-w-[120px] h-10">
                    <InputField
                      type="text"
                      placeholder="Buscar proveedor"
                      value={proveedorBusqueda}
                      onChange={(e) => setProveedorBusqueda(e.target.value)}
                      onKeyDown={handleProveedorKey}
                      className="w-full h-full"
                    />
                    {proveedorBusqueda && proveedoresFiltrados.length > 0 && (
                      <ul className="absolute z-50 bg-white border rounded w-full max-h-60 overflow-y-auto mt-1 shadow-lg">
                        {proveedoresFiltrados.map((p, i) => (
                          <li
                            key={p.id}
                            ref={(el) => (proveedorRefs.current[i] = el)}
                            onClick={() => seleccionarProveedor(p)}
                            className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                              i === highlightProveedor ? "bg-gray-200" : ""
                            }`}
                          >
                            <img
                              src={p.imagen}
                              alt={p.marca}
                              className="w-8 h-8 rounded"
                            />
                            <div>
                              <p className="text-sm font-medium">{p.marca}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* botones de proveedor */}
                <ActionButton
                  icon={FaPlus}
                  onClick={() => setShowModalProveedor(true)}
                  estilos="px-2 py-1 bg-green-500 text-white rounded"
                  title="Crear nuevo proveedor"
                />
                <ActionButton
                  icon={FaSync}
                  onClick={() => setCargarProveedores((prev) => !prev)}
                  estilos="px-2 py-1 bg-blue-500 text-white rounded"
                  title="Refrescar lista de proveedores"
                />
              </div>
            )}

            <div className="flex justify-between">
              <InputField
                label="Fecha de entrega"
                type="date"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
                className="w-full"
                labelPosition="left"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-1 font-medium">Observaciones</label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full border rounded px-2 py-1"
                rows={3}
                placeholder="Notas adicionales..."
              />
            </div>
          </div>

          <ActionButton
            onClick={limpiarPedido}
            label="Limpiar pedido"
            estilos="justify-center px-4 py-2 bg-gray-500 text-white rounded"
          />
          <button
            onClick={abrirModalConfirmacion}
            disabled={!productosSeleccionados.length || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Procesando..." : "Finalizar pedido"}
          </button>
        </div>
      </div>

      {/* Modal de confirmación con mini-resumen */}
      {showModalConfirmacion && (
        <Modal onClose={() => setShowModalConfirmacion(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirmar Pedido</h2>
          </div>

          {proveedorSeleccionado && (
            <p className="mb-2">Proveedor: {proveedorSeleccionado?.marca}</p>
          )}

          {/* tabla reutilizable */}
          <Table
            items={productosSeleccionados}
            fields={fieldsModalConfirmacion}
          />

          <div className="flex justify-end gap-2">
            <ActionButton
              icon={FaTimes}
              onClick={() => setShowModalConfirmacion(false)}
              estilos="px-4 py-2 bg-gray-300 rounded"
              title="Cancelar"
            />
            <ActionButton
              icon={FaCheck}
              onClick={confirmarPedido}
              estilos="px-4 py-2 bg-green-500 text-white rounded"
              title="Confirmar"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
