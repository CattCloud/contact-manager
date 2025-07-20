import { PuffLoader } from "react-spinners";
import logo from "../assets/logo.png";

function SplashScreen() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Fondo gradiente detrás */}
<div
  className="absolute inset-0 z-0"
  style={{
    background: "#ffffff",
    backgroundImage: `
      radial-gradient(
        120% 120% at 50% 100%,
        rgba(70, 130, 180, 0.45),
        transparent 65%
      )
    `,
    filter: "blur(60px)",
    backgroundRepeat: "no-repeat",
  }}
></div>


            {/* Contenido principal encima */}
            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen gap-3 px-6 text-white">
                <img
                    src={logo}
                    alt="Logo Agenda de Contactos"
                    className="w-62 h-auto md:w-75 md:h-auto object-contain animate-fadeIn"
                />
                <PuffLoader size={70} color="#525252" />
            </div>
        </div>
    );
}

export default SplashScreen;