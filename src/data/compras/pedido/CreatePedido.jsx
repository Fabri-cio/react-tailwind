import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Table,
  InputField,
  ActionButton,
  Modal,
} from "../../../components/shared";
import { FaTimes, FaEraser, FaCheck } from "react-icons/fa";
import { useInventarios, useProveedores } from "../../../hooks/useEntities";

export default function Pedido() {
  const { data: proveedores = [] } = useProveedores({ all_data: true });
  const { data: productosInventario = [] } = useInventarios({ all_data: true });

  const [fechaEntrega, setFechaEntrega] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [proveedorBusqueda, setProveedorBusqueda] = useState("");
  const [highlightProveedor, setHighlightProveedor] = useState(0);

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoBusqueda, setProductoBusqueda] = useState("");
  const [highlightProducto, setHighlightProducto] = useState(0);

  const [observaciones, setObservaciones] = useState("");

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const proveedorRefs = useRef([]);
  const productoRefs = useRef([]);

  // FILTRADO
  const proveedoresFiltrados = useMemo(() => {
    return proveedores.filter((p) =>
      p.marca.toLowerCase().includes(proveedorBusqueda.toLowerCase())
    );
  }, [proveedorBusqueda, proveedores]);

  const productosFiltrados = useMemo(() => {
    return productosInventario.filter((p) =>
      p.producto_nombre.toLowerCase().includes(productoBusqueda.toLowerCase())
    );
  }, [productoBusqueda, productosInventario]);

  // SELECCIONAR
  const seleccionarProveedor = (p) => {
    setProveedorSeleccionado(p);
    setProveedorBusqueda(p.marca);
  };

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

  // ELIMINAR
  const eliminarProducto = (index) => {
    setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  // ACTUALIZAR CANTIDAD
  const actualizarCantidad = (index, val) => {
    const cantidad = Math.max(1, parseInt(val) || 1);
    setProductosSeleccionados((prev) => {
      const copy = [...prev];
      copy[index].cantidad = cantidad;
      return copy;
    });
  };

  // GUARDAR PEDIDO (interna, solo se llama desde modal)
  const confirmarPedido = () => {
    const pedido = {
      fechaEntrega,
      proveedor: proveedorSeleccionado,
      productos: productosSeleccionados,
      observaciones,
    };
    console.log("Pedido guardado:", pedido);
    alert("Pedido guardado correctamente");
    limpiarPedido();
    setShowModalConfirmacion(false);
  };

  const abrirModalConfirmacion = () => {
    if (
      !fechaEntrega ||
      !proveedorSeleccionado ||
      productosSeleccionados.length === 0
    ) {
      return alert("Completa todos los campos y agrega productos.");
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
  };

  // TABLA
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
          className="w-16"
        />
      ),
    },
    {
      key: "acciones",
      label: "Acción",
      render: (_, index) => (
        <ActionButton
          icon={FaTimes}
          onClick={() => eliminarProducto(index)}
          estilos="px-2 py-1 bg-red-500 text-white rounded"
          title="Eliminar producto de la lista"
        />
      ),
    },
  ];

  // TECLADO PRODUCTO
  const handleProductoKey = (e) => {
    if (!productosFiltrados.length) return;
    if (e.key === "ArrowDown") {
      setHighlightProducto((prev) => (prev + 1) % productosFiltrados.length);
    } else if (e.key === "ArrowUp") {
      setHighlightProducto((prev) =>
        prev === 0 ? productosFiltrados.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      agregarProducto(productosFiltrados[highlightProducto]);
    }
  };

  // TECLADO PROVEEDOR
  const handleProveedorKey = (e) => {
    if (!proveedoresFiltrados.length) return;
    if (e.key === "ArrowDown") {
      setHighlightProveedor((prev) => (prev + 1) % proveedoresFiltrados.length);
    } else if (e.key === "ArrowUp") {
      setHighlightProveedor((prev) =>
        prev === 0 ? proveedoresFiltrados.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      seleccionarProveedor(proveedoresFiltrados[highlightProveedor]);
    }
  };

  // SCROLL AUTOMÁTICO
  useEffect(() => {
    if (productoRefs.current[highlightProducto]) {
      productoRefs.current[highlightProducto].scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightProducto]);

  useEffect(() => {
    if (proveedorRefs.current[highlightProveedor]) {
      proveedorRefs.current[highlightProveedor].scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightProveedor]);

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
        Nuevo Pedido
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
        {/* Tabla de productos */}
        <div className="md:w-2/3">
          <Table items={productosSeleccionados} fields={fields} />
        </div>

        {/* Resumen y botones */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {/* Contenedor de resumen */}
          <div className="p-4 border rounded bg-gray-50 space-y-2">
            {/* Autocomplete Proveedor */}
            <div className="flex justify-between">
              <InputField
                label="Proveedor"
                type="text"
                placeholder="Buscar proveedor"
                value={proveedorBusqueda}
                onChange={(e) => setProveedorBusqueda(e.target.value)}
                onKeyDown={handleProveedorKey}
                className="w-full"
                labelPosition="left"
              />
              {proveedorBusqueda && proveedoresFiltrados.length > 0 && (
                <ul className="absolute z-50 bg-white border rounded w-40 max-h-60 overflow-y-auto mt-1 shadow-lg">
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
                        <p className="text-xs text-gray-500">{p.contacto}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Fecha de entrega */}
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
            {/* Observaciones */}
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
          {/* Botones */}
          <ActionButton
            onClick={limpiarPedido}
            label="Limpiar pedido"
            estilos="justify-center px-4 py-2 bg-gray-500 text-white rounded"
          />
          <ActionButton
            onClick={abrirModalConfirmacion}
            label="Confirmar pedido"
            estilos="justify-center px-4 py-2 bg-blue-500 text-white rounded"
          />
        </div>
      </div>

      {/* Modal de confirmación con mini-resumen */}
      {showModalConfirmacion && (
        <Modal onClose={() => setShowModalConfirmacion(false)}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Confirmar pedido</h2>
            <p className="mb-2">Proveedor: {proveedorSeleccionado?.marca}</p>
            <p className="mb-2">Fecha de entrega: {fechaEntrega}</p>
            <p className="mb-2 font-medium">Productos:</p>
            <ul className="mb-4 max-h-48 overflow-y-auto border rounded p-2">
              {productosSeleccionados.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.producto_nombre}</span>
                  <span>Cantidad: {p.cantidad}</span>
                </li>
              ))}
            </ul>
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
          </div>
        </Modal>
      )}
    </div>
  );
}
