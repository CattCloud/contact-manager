export default function BadgeRelacion({ tipoRelacion }) {
  const estiloBase = "px-3 py-1 text-sm font-semibold rounded-full shadow-md";
  
  const estilos = {
    familia: "bg-secondary-blue text-white",
    amistad: "bg-secondary-green text-white",
    personal: "bg-secondary-orange text-white",
    trabajo: "bg-secondary-yellow text-white",
    social: "bg-secondary-purple text-white",
  };

  const clase = estilos[tipoRelacion] || "bg-secondary-neutral text-white";


  return (
    <span className={`${estiloBase} ${clase}`}>
      {tipoRelacion || "Sin categoría"}
    </span>
  );
}