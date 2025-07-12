import IconFavorite from "./IconFavorite";
import BadgeRelacion from "./BadgeRelacion";

function ContactoDetalle({ contacto, onToggleFavorito, onAnteriorContacto, onSiguientContacto }) {
    const mensajeEmpty = <div className="text-text-secondary w-full flex items-center justify-center flex-col  h-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p>Seleccione un contacto</p>
        <p>para mostrar detalle</p>
    </div>;
    return (
        <div className=" mt-2 md:mt-0 border-l-2 border-border pl-4 pr-4 md:pl-2 md:pr-0" >
            <div className="flex md:flex-col  border-2 border-border w-full h-full rounded-md">
                {contacto ?
                    <>
                        <div className="relative flex flex-col w-1/3 md:w-full items-center space-y-2 bg-bg-secondary py-5">
                            <div className="absolute top-2 right-2">
                                <IconFavorite favorite={contacto.favorite} onClick={() => onToggleFavorito(contacto.id)} />
                            </div>
                            {/* Imagen */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            {/* Nombre y relación */}
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-bold text-center">{contacto.nombre}</h2>
                                <BadgeRelacion tipoRelacion={contacto.relacion}/>
                            </div>
                        </div>
                        <div className="grow flex flex-col justify-between py-4">
                            {/* Detalles */}
                            <div className="space-y-3 text-sm flex flex-col items-start px-4 md:px-0 md:items-center  justify-between text-text-primary">
                                <p >
                                    <strong className="text-secondary-neutral">Teléfono:</strong> {contacto.telefono}
                                </p>
                                {contacto.correo && <p>
                                    <strong className="text-secondary-neutral">Correo:</strong> {contacto.correo ? contacto.correo : ""}
                                </p>}
                                {
                                    contacto.direccion && <p> <strong className="text-secondary-neutral">Dirección:</strong> {contacto.direccion ? contacto.direccion : ""}
                                    </p>
                                }
                            </div>

                            {/* Botones de acción (pueden crecer después) */}
                            <div className="flex gap-2 justify-center mt-4">

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
                    </> : mensajeEmpty
                }
            </div>
        </div>
    );
}

export default ContactoDetalle;