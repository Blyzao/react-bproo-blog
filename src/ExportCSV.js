import React from "react";

const ExportCSV = ({ data, headers, filename, buttonText }) => {
  // Fonction pour formater les en-têtes automatiquement
  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Ajoute un espace avant les majuscules
      .replace(/^./, (str) => str.toUpperCase()) // Met la première lettre en majuscule
      .replace(/_/g, " "); // Remplace les underscores par des espaces
  };

  // Générer les en-têtes automatiquement si headers n'est pas fourni
  const generateHeaders = () => {
    if (headers && headers.length > 0) {
      return headers;
    }
    if (!data || data.length === 0) {
      return [];
    }
    // Prendre les clés du premier objet
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      label: formatHeader(key),
      key,
    }));
  };

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }

    // Obtenir les en-têtes (automatiques ou fournis)
    const csvHeaders = generateHeaders();
    const headerKeys = csvHeaders.map((header) => header.key);

    // Échapper les virgules, guillemets et retours à la ligne dans les données
    const escapeCSV = (value) => {
      if (value == null) return "";
      const str = value.toString();
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Convertir les données en lignes CSV
    const csvRows = [
      csvHeaders.map((header) => escapeCSV(header.label)).join(","), // Ligne d'en-têtes
      ...data.map((item) =>
        headerKeys.map((key) => escapeCSV(item[key])).join(",")
      ),
    ];

    // Créer le contenu CSV
    const csvContent = csvRows.join("\n");

    // Créer un Blob pour le fichier CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Créer un lien de téléchargement
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename || "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToCSV}
      className="btn-export"
      disabled={!data || data.length === 0}
    >
      {buttonText || "Exporter en CSV"}
    </button>
  );
};

export default ExportCSV;
