import React from "react";
import * as XLSX from "xlsx";

const ExportData = ({ data, headers, filename, buttonText, format }) => {
  // Fonction pour formater les en-têtes automatiquement
  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/_/g, " ");
  };

  // Générer les en-têtes automatiquement si headers n'est pas fourni
  const generateHeaders = () => {
    if (headers && headers.length > 0) {
      return headers;
    }
    if (!data || data.length === 0) {
      return [];
    }
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      label: formatHeader(key),
      key,
    }));
  };

  const exportData = () => {
    if (!data || data.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const csvHeaders = generateHeaders();
    const headerKeys = csvHeaders.map((header) => header.key);
    const headerLabels = csvHeaders.map((header) => header.label);

    // Déterminer l'extension et le type MIME
    const isXlsx = format === "xlsx";
    const extension = isXlsx ? ".xlsx" : ".csv";
    const mimeType = isXlsx
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "text/csv;charset=utf-8;";

    // Construire le nom du fichier
    const finalFilename = filename
      ? filename.endsWith(extension)
        ? filename
        : `${filename}${extension}`
      : `export${extension}`;

    console.log(`Exporting file: ${finalFilename} with MIME type: ${mimeType}`);

    if (isXlsx) {
      // Export XLSX
      const worksheetData = [
        headerLabels,
        ...data.map((item) => headerKeys.map((key) => item[key] ?? "")),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const colWidths = headerLabels.map((label, i) => ({
        wch: Math.max(
          label.length,
          ...data.map((item) => item[headerKeys[i]]?.toString().length || 10)
        ),
      }));
      worksheet["!cols"] = colWidths;
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Générer un Blob pour XLSX
      const xlsxBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([xlsxBuffer], { type: mimeType });

      // Créer un lien de téléchargement
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", finalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Export CSV
      const escapeCSV = (value) => {
        if (value == null) return "";
        const str = value.toString();
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };
      const csvRows = [
        headerLabels.map(escapeCSV).join(","),
        ...data.map((item) =>
          headerKeys.map((key) => escapeCSV(item[key])).join(",")
        ),
      ];
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: mimeType });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", finalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button
      onClick={exportData}
      className="btn-export"
      disabled={!data || data.length === 0}
    >
      {buttonText || `Exporter en ${format === "xlsx" ? "Excel" : "CSV"}`}
    </button>
  );
};

export default ExportData;
