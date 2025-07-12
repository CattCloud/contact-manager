export default function BadgeRelacion({ tipoRelacion }) {
  const estiloBase = "px-3 py-1 text-sm font-semibold rounded-full";
  
  const estilos = {
    Familia: "bg-secondary-blue text-text-primary",
    Amistad: "bg-secondary-green text-text-primary",
    Personal: "bg-secondary-orange text-text-primary",
    Trabajo: "bg-secondary-yellow text-text-primary",
    Otro: "bg-secondary-purple text-text-primary",
  };

  const clase = estilos[tipoRelacion] || "bg-secondary-neutral text-text-primary";

  return (
    <span className={`${estiloBase} ${clase}`}>
      {tipoRelacion || "Sin categoría"}
    </span>
  );
}