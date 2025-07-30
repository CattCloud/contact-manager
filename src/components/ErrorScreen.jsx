import error from "../assets/error.png";

function ErrorScreen({ 
  codigo = "Error 500", 
  descripcion = "Algo salió mal. Inténtalo de nuevo."
}) {
  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden px-6 py-6">
      {/* Fondo gradiente suave desde arriba */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #fca5a5 100%)",
          backgroundRepeat: "no-repeat",
          filter: "blur(80px)"
        }}
      />

      {/* Contenido principal corregido */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center text-[#1f2937] pt-4">
        {/* Imagen del error */}
        <img
          src={error}
          alt="Desconexión"
          className="w-60 md:w-72 h-auto object-contain"
        />

        {/* Código de error */}
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-red">
          {codigo}
        </h1>

        {/* Descripción */}
        <p className="text-base md:text-lg max-w-md text-text-primary">
          {descripcion}
        </p>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-3 mt-3">
          {/*          <button
            className="px-5 py-2 rounded bg-secondary-red text-white border border-secondary-red transition cursor-pointer"
          >
            Volver al inicio
          </button>*/}
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded border border-secondary-red text-secondary-red transition cursor-pointer"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorScreen;