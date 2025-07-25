import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/contactos", label: "Contactos" },
    { path: "/nosotros", label: "Nosotros" }
  ];

  return (
    <nav className="relative">
      {/* Botón hamburguesa - solo visible en móviles */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none transition-all duration-300 ease-in-out"
        aria-label="Menú de navegación"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Menú desktop - visible en pantallas medianas y grandes */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg hover:bg-gray-100 ${
              isActive(item.path)
                ? "text-green-500 bg-green-50"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {item.label}
            {isActive(item.path) && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </Link>
        ))}
      </div>

      {/* Overlay para móvil */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={closeMenu}
        ></div>
      )}

      {/* Menú móvil - deslizable desde la derecha */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items del menú móvil */}
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isActive(item.path)
                  ? "text-green-600 bg-green-50 border-l-4 border-green-500 shadow-sm"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isMenuOpen
                  ? "slideInFromRight 0.3s ease-out forwards"
                  : "none"
              }}
            >
              <div className="flex items-center space-x-3">
                {/* Icono indicador para item activo */}
                {isActive(item.path) && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer del menú móvil */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
            <p>Agenda de Contactos</p>
            <p className="text-xs mt-1">Versión 1.0</p>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animaciones personalizadas */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Efectos de hover personalizados */
        .nav-item-hover {
          position: relative;
          overflow: hidden;
        }

        .nav-item-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-item-hover:hover::before {
          left: 100%;
        }
      `}</style>
    </nav>
  );
}

export default Navigation;