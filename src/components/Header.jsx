import phone from "../assets/phone.png";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import SearchHeader from "./searchGeneral";

export default function Header({ page ,search=true }) {
  const background = page === "home" ? "bg-white" : "bg-gray-100";

  return (
    <header className={`shadow-sm ${background}`}>
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                <img src={phone} alt="Logo Agenda de Contactos" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">Agenda de Contactos</h1>
            </Link>
          {search && <SearchHeader/>}
          </div>
          <Navigation/>
        </div>
      </div>
    </header>

  );
}