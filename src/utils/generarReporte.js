// components/shared/PDFReportGenerator.jsx
import React from "react";

export function PDFReportGenerator({
  dataGrouped,
  headers,
  getRows,
  title,
  fileName,
}) {
  const handleDownload = async () => {
    const [{ default: jsPDF }, autoTable] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, 20, 20);

    let currentY = 30;

    Object.entries(dataGrouped).forEach(([groupKey, groupItems]) => {
      doc.setFontSize(14);
      doc.text(groupKey, 20, currentY);
      currentY += 10;

      const rows = getRows(groupItems);

      autoTable.default(doc, {
        head: [headers],
        body: rows,
        startY: currentY,
      });

      currentY = doc.lastAutoTable.finalY + 10;
    });

    doc.save(fileName);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
    >
      Descargar Reporte en PDF
    </button>
  );
}
