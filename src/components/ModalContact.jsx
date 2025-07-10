import ContactForm from "./ContactForm";

function ModalView({ title, isOpen, onClose , onAddContact}) {
    //“Si el modal no está abierto o no hay un contacto seleccionado, no renderices nada”.
    if (!isOpen) return null;

    function closeModal() {
        onClose();
    }

    return (
        <div className={`fixed inset-0 bg-black/50 z-40 flex items-center justify-center ${!isOpen ? 'hidden' : ''}`}>
            <div className="bg-white p-6 rounded-md shadow-lg w-8/10 z-50 relative space-y-4">
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
                <div>
                <ContactForm onRegistrarContacto={onAddContact}/>
                </div>
            </div>
        </div>

    );
}

export default ModalView;

