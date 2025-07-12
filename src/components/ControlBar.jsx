function ControlBar({ onAction,filtroActivo,cantidadFavoritos,cantidadContactos }) {
    const btn_enabled = "text-text-primary bg-primary px-3 py-2 font-bold ";
    const btn_disabled = "text-text-secondary bg-bg-secondary px-3 py-2 hover:bg-hover";

    return (
        <div className="rounded-md border border-border w-fit">
            <button className={filtroActivo==="todos"?btn_enabled:btn_disabled} onClick={() => onAction("todos")}>
                {`Todos (${cantidadContactos})`}
            </button>
            <button className={filtroActivo==="favoritos"?btn_enabled:btn_disabled} onClick={() => onAction("favoritos")}>
                {`Favoritos (${cantidadFavoritos})`}
            </button>
            
        </div>
    );
}

export default ControlBar;