import phone from "../assets/phone.png";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import SearchHeader from "./searchGeneral";

export default function Header({ page, search = true ,contactos}) {
  const background = page === "home" ? "bg-white" : "bg-gray-100";

  return (
    <header className={`shadow-sm ${background} relative`}>
      <div className="mx-auto px-4 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo - siempre visible */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                <img src={phone} alt="Logo Agenda de Contactos" />
              </div>
              <h1 className="text-xl font-bold text-text-primary hidden sm:block">
                Agenda de Contactos
              </h1>
              {/* Título corto para móviles */}
              <h1 className="text-lg font-bold text-text-primary sm:hidden">
                Agenda
              </h1>
            </Link>
          </div>

          {/* Buscador - centrado y responsive */}
          {search && (
            <div className="flex-1 max-w-md mx-4 hidden md:block relative z-40">
              <SearchHeader contactos={contactos} />
            </div>
          )}

          {/* Navigation - siempre a la derecha */}
          <div className="flex-shrink-0">
            <Navigation />
          </div>
        </div>

        {/* Buscador móvil - debajo del header en móviles */}
        {search && (
          <div className="md:hidden pb-3 px-2">
            <SearchHeader contactos={contactos}/>
          </div>
        )}
      </div>
    </header>
  );
}