import Copyright from "./Copyright";
import phone from "../assets/phone.png";

export default function Footer(){
    return(
      <footer className="bg-bg-secondary border-t border-border py-8">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <img
                src={phone}
                alt="Logo Agenda de Contactos"
              />
              </div>
              <span className="text-text-primary font-semibold">Agenda de Contactos</span>
            </div>
            <div className="text-center md:text-right">
                <Copyright/>
            </div>
          </div>
        </div>
      </footer>
    );
}