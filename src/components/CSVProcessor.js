import React, { useState } from "react";
import Papa from "papaparse";
import { FiUpload, FiCheck, FiRefreshCw, FiDownload } from "react-icons/fi";

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
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-2xl font-semibold text-white text-center mb-8">
        Generador de Contenido SEO por Localidades
      </h1>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center bg-gray-800/80 
        ${isDragging ? 'border-purple-500 bg-gray-800/50 shadow-lg shadow-purple-500/20' : 'border-gradient-to-r from-gray-600 to-gray-500'} 
        transition-all duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-gray-300 text-lg mb-2 flex items-center justify-center gap-2">
          <FiUpload className="w-5 h-5 text-purple-400" />
          Arrastra y suelta tu archivo CSV aquí
        </div>
        <div className="text-gray-500 text-sm mb-4">
          o
        </div>
        <label 
          htmlFor="csvFileInput" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-md 
          hover:from-gray-600 hover:to-gray-500 transition-all duration-200 cursor-pointer shadow-lg shadow-gray-900/50"
        >
          <FiUpload className="w-4 h-4 text-purple-400" />
          Seleccionar archivo
        </label>
        <input
          id="csvFileInput"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {csvData && (
        <div className="text-green-400 text-center mt-4 flex items-center justify-center gap-2">
          <FiCheck className="w-5 h-5 text-emerald-400" />
          Archivo cargado correctamente
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button 
          className={`relative inline-flex items-center gap-2 px-6 py-2 rounded-md transition-all duration-200 shadow-lg
          ${!csvData 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500 shadow-gray-900/50'}`}
          style={{
            backgroundClip: 'padding-box',
            border: '1px solid transparent'
          }}
          onClick={handleProcessCSV} 
          disabled={!csvData}
        >
          {csvData && (
            <span 
              className="absolute inset-0 rounded-md"
              style={{
                background: 'linear-gradient(to right, rgb(107, 114, 128), rgb(75, 85, 99))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1px'
              }}
            />
          )}
          <FiRefreshCw className="w-4 h-4 text-purple-400 relative" />
          <span className="relative">Procesar CSV</span>
        </button>

        <button 
          className={`relative inline-flex items-center gap-2 px-6 py-2 rounded-md transition-all duration-200 shadow-lg
          ${!processedData 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-purple-900/50'}`}
          style={{
            backgroundClip: 'padding-box',
            border: '1px solid transparent'
          }}
          onClick={handleDownloadCSV} 
          disabled={!processedData}
        >
          {processedData && (
            <span 
              className="absolute inset-0 rounded-md"
              style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1px'
              }}
            />
          )}
          <FiDownload className="w-4 h-4 text-purple-200 relative" />
          <span className="relative">Descargar CSV Modificado</span>
        </button>
      </div>
    </div>
);
};

export default CSVProcessor;