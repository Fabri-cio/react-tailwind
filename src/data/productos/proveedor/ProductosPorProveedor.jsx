import { useProductByProveedor } from "../../../hooks/useEntities";
import { useParams } from "react-router-dom";
import {
  Loading,
  Error,
  Navigation,
  Image,
  StatusBadge,
} from "../../../components/shared";
import { FaProductHunt, FaFilePdf } from "react-icons/fa";
import { useState } from "react";

export const ProductosPorProveedor = () => {
  const id = useParams().id;
  const { data, isLoading, error } = useProductByProveedor(id);
  const [exporting, setExporting] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  const handleExportPdf = async () => {
    try {
      setExporting(true);
      // Lazy import para no cargar jspdf en el bundle inicial
      const { jsPDF } = await import("jspdf");
      const autoTableModule = await import("jspdf-autotable"); // side-effect registers plugin

      const doc = new jsPDF({
        unit: "pt",
        format: "a4",
      });

      // ----- Header: info del proveedor -----
      const margin = 40;
      const startY = 60;
      doc.setFontSize(14);
      doc.text(`Proveedor: ${data.marca}`, margin, startY);
      doc.setFontSize(10);
      doc.text(`Productos: ${data.productos.length}`, margin, startY + 18);
      if (data.descripcion) {
        // si tienes descripción corta
        doc.text(`Descripción: ${data.descripcion}`, margin, startY + 36, {
          maxWidth: 520,
        });
      }

      // ----- Tabla: productos -----
      // Construir filas
      const rows = data.productos.map((p) => [
        p.id,
        p.nombre,
        p.categoria,
        p.estado ? "Activo" : "Inactivo",
        `Bs. ${p.precio}`,
      ]);

      // Columnas
      const columns = [
        { header: "ID", dataKey: "id" },
        { header: "Nombre", dataKey: "nombre" },
        { header: "Categoría", dataKey: "categoria" },
        { header: "Estado", dataKey: "estado" },
        { header: "Precio", dataKey: "precio" },
      ];

      // Usar autoTable (nota: la importación anterior ya registró plugin)
      doc.autoTable({
        head: [columns.map((c) => c.header)],
        body: rows,
        startY: startY + 60,
        margin: { left: margin, right: margin },
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 98, 255] },
        theme: "striped",
        didDrawPage: (dataArg) => {
          // Pie de página simple con número de página
          const pageCount = doc.getNumberOfPages();
          doc.setFontSize(9);
          doc.text(
            `Página ${dataArg.pageNumber} / ${pageCount}`,
            doc.internal.pageSize.getWidth() - margin,
            doc.internal.pageSize.getHeight() - 30,
            { align: "right" }
          );
        },
      });

      // Guardar
      doc.save(`proveedor-${data.marca || id}-productos.pdf`);
    } catch (err) {
      console.error("Error exportando PDF:", err);
      alert("Ocurrió un error al generar el PDF.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <Navigation
        title={`Proveedor ${data.marca}`}
        subTitle={"Lista de productos"}
        icon={FaProductHunt}
        actions={[
          {
            title: "Exportar PDF",
            icon: FaFilePdf,
            onClick: handleExportPdf,
            disabled: exporting,
            estilos:
              "text-white hover:text-red-600 bg-red-500 hover:bg-white p-2",
          },
          {
            to: -1,
            label: "Volver",
            estilos:
              "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {data.productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Image src={producto.imagen} alt={producto.nombre} />
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-sm text-gray-600">{producto.categoria}</p>
            <p className="mt-1 font-bold">Bs. {producto.precio}</p>
            <StatusBadge isActive={producto.estado} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPorProveedor;
