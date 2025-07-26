import { useState } from "react";

const contactosMock = [
  { id: 1, nombre: "María López", telefono: "+51 987654321" },
  { id: 2, nombre: "Juan Pérez", telefono: "+51 912345678" },
  { id: 3, nombre: "Lucía Ramos", telefono: "+51 955001122" }
];

export default function BuscadorDeContactos({ contactos = contactosMock }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const handleChange = (e) => {
    const valor = e.target.value;
    setQuery(valor);

    if (valor.trim().length === 0) {
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
    setQuery(`${contacto.nombre} - ${contacto.telefono}`);
    setResultados([]);
    setMostrarDropdown(false);
  };

  return (
    <div className="max-w-lg relative">
      {/* Input con icono a la izquierda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="size-5 text-text-label"
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
          className="block w-full py-2 px-2 ps-10 text-sm text-text-primary border bg-white border-border-form rounded-md focus:ring-1 focus:outline-none focus:ring-hover-input focus:border-hover-input"
          placeholder="Buscar por nombre, teléfono o favorito"
        />
      </div>

      {/* Lista desplegable de resultados */}
      {mostrarDropdown && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-border-form rounded-md shadow-md z-50">
          {resultados.map((contacto) => (
            <li
              key={contacto.id}
              onClick={() => handleSeleccion(contacto)}
              className="px-4 py-2 hover:bg-hover-input cursor-pointer"
            >
              <p className="text-sm font-semibold text-text-primary">
                {contacto.nombre}
              </p>
              <p className="text-xs text-text-label">{contacto.telefono}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}