function BotonAddContacto({ onAction }) {
  return (
    <button
      onClick={onAction}
      title="Agregar nuevo contacto"
      className="px-4 py-2 rounded-md border transition-colors duration-200 flex items-center gap-2
         hover:bg-white  hover:text-secondary-green  hover:border-secondary-green
       bg-secondary-green text-white cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
      <span className="font-semibold text-sm">Nuevo contacto</span>
    </button>
  );
}

export default BotonAddContacto;