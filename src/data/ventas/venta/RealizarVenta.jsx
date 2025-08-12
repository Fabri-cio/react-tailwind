import React, { useState, useMemo, useEffect } from "react";
import { useInventarios } from "../../../hooks/useEntities";

function RealizarVenta() {
  const { data: productos = [] } = useInventarios({ all_data: true });

  // Mapa rápido para búsqueda por código de barras (incluye códigos alternativos)
  const productosMap = useMemo(() => {
    const map = {};
    productos.forEach((p) => {
      map[p.producto_barcode] = p;
      if (p.codigosAdicionales && Array.isArray(p.codigosAdicionales)) {
        p.codigosAdicionales.forEach((c) => {
          map[c] = p;
        });
      }
    });
    return map;
  }, [productos]);

  // Estados
  const [codigo, setCodigo] = useState("");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [items, setItems] = useState([]);
  const [descuentoGlobal, setDescuentoGlobal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Estado nuevo para mostrar modal
  const [showModal, setShowModal] = useState(false);

  // Cargar persistencia
  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem("ventaItems") || "[]");
      const savedDescuento = parseFloat(
        localStorage.getItem("ventaDescuentoGlobal") || "0"
      );
      if (Array.isArray(savedItems) && savedItems.length > 0)
        setItems(savedItems);
      if (!isNaN(savedDescuento)) setDescuentoGlobal(savedDescuento);
    } catch {
      // ignore parse errors
    }
  }, []);

  // Guardar persistencia
  useEffect(() => {
    localStorage.setItem("ventaItems", JSON.stringify(items));
    localStorage.setItem("ventaDescuentoGlobal", descuentoGlobal);
  }, [items, descuentoGlobal]);

  // Validación y actualización de cantidad
  const actualizarCantidad = (index, val) => {
    const cantidad = Math.max(1, parseInt(val) || 1);
    setItems((prev) => {
      const copy = [...prev];
      if (cantidad > copy[index].stockDisponible) {
        alert(
          `No hay suficiente stock para "${copy[index].nombre}". Máximo disponible: ${copy[index].stockDisponible}`
        );
        return prev;
      }
      copy[index].cantidad = cantidad;
      const subtotal = copy[index].precio * cantidad;
      if (copy[index].descuento > subtotal) copy[index].descuento = subtotal;
      return copy;
    });
  };

  // Validación y actualización de descuento por producto
  const actualizarDescuento = (index, val) => {
    setItems((prev) => {
      const copy = [...prev];
      const subtotal = copy[index].precio * copy[index].cantidad;
      const descuento = Math.min(Math.max(0, parseFloat(val) || 0), subtotal);
      copy[index].descuento = descuento;
      return copy;
    });
  };

  // Validación y actualización de descuento global
  const actualizarDescuentoGlobal = (val) => {
    const subtotalGeneral = items.reduce(
      (acc, i) => acc + i.precio * i.cantidad,
      0
    );
    const descuentoProductos = items.reduce((acc, i) => acc + i.descuento, 0);
    const maxDescuento = subtotalGeneral - descuentoProductos;
    const descuento = Math.min(Math.max(0, parseFloat(val) || 0), maxDescuento);
    setDescuentoGlobal(descuento);
  };

  // Agregar producto desde código de barras
  const agregarProductoPorCodigo = () => {
    if (!codigo.trim()) return;
    const prod = productosMap[codigo.trim()];
    if (prod) {
      setItems((prev) => {
        const index = prev.findIndex((item) => item.id === prod.id);
        if (index !== -1) {
          const copy = [...prev];
          if (copy[index].cantidad + 1 > copy[index].stockDisponible) {
            alert(`No hay suficiente stock para "${copy[index].nombre}".`);
            return prev;
          }
          copy[index].cantidad += 1;
          return copy;
        } else {
          return [
            ...prev,
            {
              id: prod.id,
              nombre: prod.producto_nombre,
              cantidad: 1,
              precio: parseFloat(prod.precio),
              descuento: 0,
              stockDisponible: prod.cantidad,
            },
          ];
        }
      });
      setCodigo("");
    } else {
      alert("Producto no encontrado por código de barras");
    }
  };

  // Agregar producto desde búsqueda por nombre (más tolerante)
  const agregarProductoPorNombre = (nombre) => {
    const nombreNormalized = nombre.trim().toLowerCase();
    const prod = productos.find(
      (p) => p.producto_nombre.toLowerCase() === nombreNormalized
    );
    if (prod) {
      setItems((prev) => {
        const index = prev.findIndex((item) => item.id === prod.id);
        if (index !== -1) {
          const copy = [...prev];
          if (copy[index].cantidad + 1 > copy[index].stockDisponible) {
            alert(`No hay suficiente stock para "${copy[index].nombre}".`);
            return prev;
          }
          copy[index].cantidad += 1;
          return copy;
        } else {
          return [
            ...prev,
            {
              id: prod.id,
              nombre: prod.producto_nombre,
              cantidad: 1,
              precio: parseFloat(prod.precio),
              descuento: 0,
              stockDisponible: prod.cantidad,
            },
          ];
        }
      });
      setBusquedaNombre("");
    } else {
      alert("Producto no encontrado por nombre");
    }
  };

  // Eliminar producto de la lista
  const eliminarItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Productos filtrados para autocompletar búsqueda por nombre
  const productosFiltrados = productos.filter((p) =>
    p.producto_nombre.toLowerCase().includes(busquedaNombre.toLowerCase())
  );

  // Cálculo de totales
  const subtotalGeneral = items.reduce(
    (acc, i) => acc + i.precio * i.cantidad,
    0
  );
  const descuentoProductos = items.reduce((acc, i) => acc + i.descuento, 0);
  const descuentoTotal = descuentoProductos + descuentoGlobal;
  const totalFinal = subtotalGeneral - descuentoTotal;

  // Al hacer clic en "Finalizar venta", abrir modal
  const handleFinalizarClick = () => {
    if (items.length === 0) {
      alert("No hay productos para vender.");
      return;
    }
    setShowModal(true);
  };

  // Confirmar venta (real)
  const confirmarVenta = async () => {
    setLoading(true);
    try {
      // Aquí va la llamada a backend si aplica
      alert("Venta realizada con éxito");
      setItems([]);
      setDescuentoGlobal(0);
      localStorage.removeItem("ventaItems");
      localStorage.removeItem("ventaDescuentoGlobal");
      setShowModal(false);
    } catch (e) {
      alert("Error al realizar la venta. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Cancelar modal
  const cancelarModal = () => setShowModal(false);

  return (
    <div>
      <h1>POS - Venta</h1>

      {/* Código de barras */}
      <label htmlFor="codigoInput">Código de barras:</label>
      <input
        id="codigoInput"
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProductoPorCodigo()}
        placeholder="Escanear código de barras"
        autoFocus
        aria-label="Escanear código de barras"
      />

      {/* Búsqueda por nombre */}
      <div style={{ marginTop: 20 }}>
        <label htmlFor="nombreBusqueda">Búsqueda por nombre:</label>
        <input
          id="nombreBusqueda"
          type="text"
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
          placeholder="Escribe el nombre del producto"
          list="productos-sugeridos"
          aria-label="Buscar producto por nombre"
        />
        <datalist id="productos-sugeridos">
          {productosFiltrados.map((p) => (
            <option key={p.id} value={p.producto_nombre} />
          ))}
        </datalist>
        <button
          onClick={() => agregarProductoPorNombre(busquedaNombre)}
          disabled={!busquedaNombre}
          style={{ marginLeft: 10 }}
          aria-label="Agregar producto por nombre"
        >
          Agregar por nombre
        </button>
      </div>

      {/* Tabla de productos */}
      <table
        border="1"
        style={{ width: "100%", marginTop: "20px" }}
        aria-label="Lista de productos para venta"
      >
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Descuento</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const subtotal = item.precio * item.cantidad - item.descuento;
            return (
              <tr key={i}>
                <td>{item.nombre}</td>
                <td>
                  <input
                    type="number"
                    value={item.cantidad}
                    min={1}
                    max={item.stockDisponible}
                    onChange={(e) => actualizarCantidad(i, e.target.value)}
                    style={{ width: "50px" }}
                    aria-label={`Cantidad de ${item.nombre}`}
                  />
                </td>
                <td>{item.precio.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.descuento}
                    min={0}
                    max={item.precio * item.cantidad}
                    onChange={(e) => actualizarDescuento(i, e.target.value)}
                    style={{ width: "60px" }}
                    aria-label={`Descuento de ${item.nombre}`}
                  />
                </td>
                <td>{subtotal.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => eliminarItem(i)}
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Resumen y descuentos */}
      <div style={{ marginTop: 20 }}>
        <p>
          <strong>Subtotal productos:</strong> {subtotalGeneral.toFixed(2)}
        </p>
        <p>
          <strong>Descuento productos:</strong> {descuentoProductos.toFixed(2)}
        </p>
        <p>
          <label htmlFor="descuentoGlobalInput">Descuento global:</label>{" "}
          <input
            id="descuentoGlobalInput"
            type="number"
            value={descuentoGlobal}
            min={0}
            max={subtotalGeneral - descuentoProductos}
            onChange={(e) => actualizarDescuentoGlobal(e.target.value)}
            style={{ width: "80px" }}
            aria-label="Descuento global"
          />
        </p>
        <p>
          <strong>Total final:</strong> {totalFinal.toFixed(2)}
        </p>
      </div>

      {/* Botón finalizar venta ahora abre modal */}
      <button
        onClick={handleFinalizarClick}
        disabled={loading || items.length === 0}
        style={{ marginTop: 20 }}
        aria-label="Finalizar venta"
      >
        {loading ? "Procesando..." : "Finalizar venta"}
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modalTitulo"
          aria-describedby="modalDescripcion"
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              width: "90%",
              maxWidth: 600,
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2 id="modalTitulo">Factura de la Venta</h2>
            <div id="modalDescripcion">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        borderBottom: "1px solid #ccc",
                        textAlign: "left",
                      }}
                    >
                      Producto
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid #ccc",
                        textAlign: "right",
                      }}
                    >
                      Cantidad
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid #ccc",
                        textAlign: "right",
                      }}
                    >
                      Precio Unitario
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid #ccc",
                        textAlign: "right",
                      }}
                    >
                      Descuento
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid #ccc",
                        textAlign: "right",
                      }}
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const subtotal =
                      item.precio * item.cantidad - item.descuento;
                    return (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td style={{ textAlign: "right" }}>{item.cantidad}</td>
                        <td style={{ textAlign: "right" }}>
                          {item.precio.toFixed(2)}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {item.descuento.toFixed(2)}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {subtotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      Subtotal productos:
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {subtotalGeneral.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      Descuento productos:
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {descuentoProductos.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      Descuento global:
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {descuentoGlobal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "1.2em",
                      }}
                    >
                      Total final:
                    </td>
                    <td style={{ textAlign: "right", fontSize: "1.2em" }}>
                      {totalFinal.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button
                onClick={cancelarModal}
                disabled={loading}
                style={{ marginRight: 10 }}
                aria-label="Cancelar venta"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarVenta}
                disabled={loading}
                aria-label="Confirmar venta"
              >
                {loading ? "Procesando..." : "Confirmar venta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RealizarVenta;
