function ModalContact({ title, isOpen, contacto, onClose, onSiguientContacto, onAnteriorContacto }) {
    //“Si el modal no está abierto o no hay un contacto seleccionado, no renderices nada”.
    if (!isOpen || !contacto) return null;

    const { nombre, correo, telefono, favorite } = contacto;

    function closeModal() {
        onClose();
    }

    return (
        <div className={`fixed inset-0 bg-black/50 z-40 flex items-center justify-center ${!isOpen ? 'hidden' : ''}`}>
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md z-50 relative space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={closeModal}
                        className=" text-secondary-red hover:text-red-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3 text-text-secondary">
                    <p>
                        <span className="font-medium text-text-primary">Nombre: </span> {nombre}
                    </p>
                    <p>
                        <span className="font-medium text-text-primary">Correo: </span>  {correo}
                    </p>
                    <p>
                        <span className="font-medium text-text-primary">Teléfono: </span>{telefono}
                    </p>
                    <div className={` flex ${favorite ? "text-secondary-yellow" : "text-secondary-neutral"}`}>
                        <span className="font-medium text-text-primary">Favorito: </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                </div>
                <div className=" flex justify-center">
                    <button onClick={onAnteriorContacto}>
                        <svg className="size-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.75 12H6.75M6.75 12L9.5 14.75M6.75 12L9.5 9.25" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>
                    </button>
                    <button onClick={onSiguientContacto}>
                        <svg className="size-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.75 12H16.75M16.75 12L14 14.75M16.75 12L14 9.25" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ModalContact;

