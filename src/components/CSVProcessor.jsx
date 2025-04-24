import React, { useState } from "react";
import Papa from "papaparse";
import { FiUpload, FiCheck, FiRefreshCw, FiDownload } from "react-icons/fi";

const CSVProcessor = () => {
  const [csvData, setCsvData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [keywordToReplace, setKeywordToReplace] = useState('');
  const [customLocations, setCustomLocations] = useState([]);
  
  // Add drag and drop handlers
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
    const files = e.dataTransfer.files;
    if (files.length) {
      handleCSVFile(files[0]);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleCSVFile(file);
    }
  };

  const handleCSVFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = Papa.parse(text, { skipEmptyLines: true });
      setCsvData(result.data);
    };
    reader.readAsText(file);
  };

  const handleProcessCSV = () => {
    if (!csvData) return;
    const processed = processCSV(csvData);
    setProcessedData(processed);
  };

  const handleDownloadCSV = () => {
    if (!processedData) return;
    const csv = Papa.unparse(processedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'processed_locations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para normalizar texto (eliminar acentos, convertir a minúsculas y reemplazar espacios)
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .toLowerCase()
      .replace(/\s+/g, "-"); // Reemplazar espacios por guiones
  };

  // Procesar el archivo CSV
  // Nuevo manejador para el archivo de ubicaciones
  const handleLocationsFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const locations = e.target.result
          .split('\n')
          .map(location => location.trim())
          .filter(location => location.length > 0);
        setCustomLocations(locations);
      };
      reader.readAsText(file);
    }
  };

  // Modificar processCSV para usar la palabra clave dinámica
  const processCSV = (data) => {
    const headers = data[0];
    const rows = data.slice(1);

    const newRows = rows.flatMap((row) => {
      const originalRow = [...row];
      const modifiedRows = customLocations.map((location) => {
        const newRow = row.map((cell) => {
          if (typeof cell === "string") {
            return cell.replace(keywordToReplace, location);
          }
          return cell;
        });

        if (newRow[0]) {
          const locationNormalized = normalizeText(location);
          newRow[0] = newRow[0].replace(
            normalizeText(keywordToReplace), 
            locationNormalized
          );
        }

        return newRow;
      });

      return [originalRow, ...modifiedRows];
    });

    return [headers, ...newRows];
  };

  // Añadir en el return, justo después del h1
  return (
    <div className="max-w-4xl mx-auto p-6 mt-8" style={{ backgroundColor: '#010409' }}>
      <h1 className="text-2xl font-semibold text-white text-center mb-8">
        Generador de Contenido SEO por Localidades
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Palabra clave a reemplazar
          </label>
          <input
            type="text"
            value={keywordToReplace}
            onChange={(e) => setKeywordToReplace(e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-800/50 text-gray-400 rounded-md border border-gray-700/50 focus:border-gray-600 focus:ring-0 text-sm"
            placeholder="Ej: Toledo"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Lista de ubicaciones
          </label>
          <label 
            htmlFor="locationsFile"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-400 rounded-md border border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-colors text-sm"
          >
            <FiUpload className="w-3 h-3 text-gray-500" />
            Subir archivo TXT
          </label>
          <input
            id="locationsFile"
            type="file"
            accept=".txt"
            onChange={handleLocationsFileUpload}
            className="hidden"
          />
          <p className="text-xs text-gray-500">
            {customLocations.length === 0 
              ? "No hay ubicaciones cargadas" 
              : `${customLocations.length} ubicaciones cargadas`}
          </p>
        </div>
      </div>
      
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
          className="inline-flex items-center px-3 py-1.5 bg-gray-800/50 text-gray-400 rounded-md 
          hover:bg-gray-700/30 transition-colors cursor-pointer text-sm border border-gray-700/50"
        >
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
          className={`relative inline-flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 shadow-lg
          ${!csvData 
            ? 'bg-gray-800/80 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-800/90 text-white hover:bg-gray-700/90 shadow-gray-900/50'}`}
          style={{
            backgroundClip: 'padding-box',
            border: '1px solid transparent'
          }}
          onClick={handleProcessCSV} 
          disabled={!csvData}
        >
          <FiRefreshCw className="w-4 h-4 text-purple-400 relative" />
          <span className="relative">Procesar CSV</span>
        </button>

        <button 
          className={`relative inline-flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 shadow-lg
          ${!processedData 
            ? 'bg-gray-800/80 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-800/90 text-white hover:bg-gray-700/90 shadow-gray-900/50'}`}
          style={{
            backgroundClip: 'padding-box',
            border: '1px solid transparent'
          }}
          onClick={handleDownloadCSV} 
          disabled={!processedData}
        >
          <FiDownload className="w-4 h-4 text-purple-400 relative" />
          <span className="relative">Descargar CSV Modificado</span>
        </button>
      </div>
    </div>
);
};

export default CSVProcessor;