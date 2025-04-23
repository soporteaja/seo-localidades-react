import React, { useState } from "react";
import Papa from "papaparse";
import "./CSVProcessor.css";

const CSVProcessor = () => {
  const [csvData, setCsvData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Lista de provincias de España
  const provinciasEspana = [
    "Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla",
    "Huesca", "Teruel", "Zaragoza", "Asturias", "Baleares", "Las Palmas", "Santa Cruz de Tenerife",
    "Cantabria", "Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid",
    "Zamora", "Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo", "Barcelona", "Girona",
    "Lleida", "Tarragona", "Badajoz", "Cáceres", "A Coruña", "Lugo", "Ourense", "Pontevedra", "Madrid",
    "Murcia", "Navarra", "La Rioja", "Álava", "Gipuzkoa", "Bizkaia", "Alicante", "Castellón", "Valencia",
    "Ceuta", "Melilla"
  ];

  // Función para normalizar texto (eliminar acentos, convertir a minúsculas y reemplazar espacios)
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .toLowerCase()
      .replace(/\s+/g, "-"); // Reemplazar espacios por guiones
  };

  // Procesar el archivo CSV
  const processCSV = (data) => {
    const headers = data[0];
    const rows = data.slice(1);

    // Procesar cada fila
    const newRows = rows.flatMap((row) => {
      const originalRow = [...row]; // Mantener la fila original
      const modifiedRows = provinciasEspana.map((provincia) => {
        const newRow = row.map((cell) => {
          if (typeof cell === "string") {
            return cell.replace("Toledo", provincia);
          }
          return cell;
        });

        // Modificar el Permalink
        if (newRow[0]) {
          const provinciaNormalized = normalizeText(provincia);
          newRow[0] = newRow[0].replace("toledo", provinciaNormalized);
        }

        return newRow;
      });

      return [originalRow, ...modifiedRows];
    });

    return [headers, ...newRows];
  };

  // Manejar la carga del archivo CSV
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (result) => {
          setCsvData(result.data);
        },
      });
    }
  };

  // Procesar y generar el archivo CSV modificado
  const handleProcessCSV = () => {
    if (!csvData) return;

    const processedData = processCSV(csvData);
    setProcessedData(processedData);
  };

  // Descargar el archivo CSV modificado
  const handleDownloadCSV = () => {
    if (!processedData) return;

    const csvContent = Papa.unparse(processedData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "contenido_provincias.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: false,
        complete: (result) => {
          setCsvData(result.data);
        },
      });
    }
  };

  return (
    <div className="csv-processor">
      <h1 className="title">Generador de Contenido SEO por Localidades</h1>
      
      <div 
        className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drag-drop-text">
          📁 Arrastra y suelta tu archivo CSV aquí
        </div>
        <div className="drag-drop-subtext">
          o
        </div>
        <label htmlFor="csvFileInput" className="file-input-label">
          Seleccionar archivo
        </label>
        <input
          id="csvFileInput"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      {csvData && (
        <div className="status-indicator">
          ✅ Archivo cargado correctamente
        </div>
      )}

      <div className="button-container">
        <button 
          className="button process-button" 
          onClick={handleProcessCSV} 
          disabled={!csvData}
        >
          🔄 Procesar CSV
        </button>

        <button 
          className="button download-button" 
          onClick={handleDownloadCSV} 
          disabled={!processedData}
        >
          ⬇️ Descargar CSV Modificado
        </button>
      </div>
    </div>
  );
};

export default CSVProcessor;