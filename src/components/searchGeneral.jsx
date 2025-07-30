import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function BuscadorDeContactos({ contactos = [] }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const valor = e.target.value;
    setQuery(valor);

    if (valor.trim().length === 0) {
      setResultados([]);
      setMostrarDropdown(false);
      return;
    }

    // Verificar que contactos existe y es un array
    if (!contactos || !Array.isArray(contactos)) {
      setResultados([]);
      setMostrarDropdown(false);
      return;
    }

    const filtrados = contactos.filter((contacto) =>
      contacto.nombre.toLowerCase().includes(valor.toLowerCase()) ||
      contacto.telefono.includes(valor)
    );

    setResultados(filtrados);
    setMostrarDropdown(filtrados.length > 0);
  };

  const handleSeleccion = (contacto) => {
    console.log("Seleccionaste:", contacto);
    // Limpiar el estado del dropdown
    setQuery("");
    setResultados([]);
    setMostrarDropdown(false);
    // Navegar a la página de detalles del contacto
    navigate(`/contacto/${contacto.id}`);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Input con icono a la izquierda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="size-4 md:size-5 text-text-label"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={query}
          onChange={handleChange}
          type="search"
          id="search-contact"
          className="block w-full py-2 px-2 ps-8 md:ps-10 text-sm text-text-primary border bg-white border-border-form rounded-md focus:ring-1 focus:outline-none focus:ring-hover-input focus:border-hover-input transition-all duration-200"
          placeholder="Buscar contacto..."
        />
      </div>

      {/* Lista desplegable de resultados */}
      {mostrarDropdown && (
        <ul className="absolute top-full left-0 w-full mt-1 md:mt-2 bg-white border border-border-form rounded-md shadow-lg z-[9999] max-h-60 overflow-y-auto">
          {resultados.map((contacto) => (
            <li
              key={contacto.id}
              onClick={() => handleSeleccion(contacto)}
              className="px-3 md:px-4 py-2 md:py-3 hover:bg-border cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
            >
              <p className="text-sm font-semibold text-text-primary truncate">
                {contacto.nombre}
              </p>
              <p className="text-xs text-text-label">{contacto.telefono}</p>
            </li>
          ))}
          
          {/* Mensaje cuando no hay resultados */}
          {resultados.length === 0 && query.trim().length > 0 && (
            <li className="px-3 md:px-4 py-3 text-sm text-text-label text-center">
              No se encontraron contactos
            </li>
          )}
        </ul>
      )}
    </div>
  );
}