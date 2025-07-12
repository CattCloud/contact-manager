import ContactCard from "./ContactCard";

function ListContacts({ search, contactos, onFavorite, mensajeIsEmpty, onSeleccionarContacto ,contactoElegido,onEditarContacto,onEliminarContacto}) {

    const vista_nodatos = <div className="flex flex-col items-center justify-center w-full text-text-secondary h-20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
        <p>{mensajeIsEmpty}</p>
    </div>;
    return (
        <>
            {contactos.length ?
                <div className="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
                    {contactos.map((contacto) => {
                        const isSelected = contactoElegido?.id === contacto.id;
                        return (
                            <ContactCard
                                key={contacto.id}
                                contacto={contacto}
                                onVerContacto={() => onSeleccionarContacto(contacto)}
                                onFavorite={onFavorite}
                                search={search}
                                isSelected={isSelected}
                                onEditarContacto={onEditarContacto}
                                onEliminarContacto={onEliminarContacto}
                            />
                        );
                    })}
                </div>

                :
                vista_nodatos
            }

        </>
    );
}

export default ListContacts;


/*
                    <ModalContact 
                        title="Detalle Contacto" 
                        isOpen={!!contactoSeleccionado}
                        contacto={contactoSeleccionado}
                        onClose={() => setContactoSeleccionado(null)}
                        onSiguientContacto={siguienteContacto}
                        onAnteriorContacto={anteriorContacto}
                    />
*/