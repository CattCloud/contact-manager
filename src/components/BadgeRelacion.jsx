export default function BadgeRelacion({ tipoRelacion }) {
  const estiloBase = "px-3 py-1 text-sm font-semibold rounded-full";
  
  const estilos = {
    familia: "bg-secondary-blue text-text-primary",
    amistad: "bg-secondary-green text-text-primary",
    personal: "bg-secondary-orange text-text-primary",
    trabajo: "bg-secondary-yellow text-text-primary",
    social: "bg-secondary-purple text-text-primary",
  };

  const clase = estilos[tipoRelacion] || "bg-secondary-neutral text-text-primary";

  return (
    <span className={`${estiloBase} ${clase}`}>
      {tipoRelacion || "Sin categoría"}
    </span>
  );
}