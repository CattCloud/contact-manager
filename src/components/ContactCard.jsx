import IconFavorite from "./IconFavorite";
import BadgeRelacion from "./BadgeRelacion";
import { ModalConfirmaccion } from "../utils/modalConfirmacion";

export default function ContactCard({ contacto, onFavorite, onVerContacto, search, isSelected, onEditarContacto, onEliminarContacto }) {

    const { id, nombre, relacion, telefono, favorite } = contacto;


    function resaltar(texto) {
        if (!search) return texto;

        const partes = texto.split(new RegExp(`(${search})`, 'gi'));
        return partes.map((parte, i) =>
            parte.toLowerCase() === search.toLowerCase() ? (
                <span key={i} className="bg-yellow-200 font-semibold">{parte}</span>
            ) : (
                <span key={i}>{parte}</span>
            )
        );
    }

    return (
        <div
            className={`flex flex-col space-y-3 p-4 rounded-md border border-border bg-bg-primary shadow-sm transition-shadow duration-200 cursor-pointer
    hover:shadow-md hover:scale-[1.01] hover:border-accent hover:bg-gray-100
    ${isSelected ? "shadow-md scale-[1.01] border-accent bg-gray-100" : ""}
  `}
        >
            <div id="contact-card-head" className="text-text-primary flex justify-between gap-1">
                <p>{resaltar(nombre)}</p>
                <div className="flex gap-2 justify-start items-start">
                    <BadgeRelacion tipoRelacion={relacion} />
                </div>
            </div>
            <div className="text-text-secondary space-y-1">
                <div className="flex gap-2 justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <p>{resaltar(telefono)}</p>
                </div>

            </div>
            <div className="flex justify-center items-center gap-4 my-1">
                <ModalConfirmaccion
                    onAction={() => onEliminarContacto(id)}
                    contacto={contacto}
                    triggerButton={(abrir) => (
                        <button onClick={abrir} title="Eliminar Contacto" className="text-icon-btn p-1 hover:text-icon-btn-hover" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    )}
                />
                <btn title="Editar Contacto" className="text-icon-btn p-1 hover:text-icon-btn-hover" onClick={() => onEditarContacto(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </btn>
                <btn title="Detalle Contacto" className="text-icon-btn  hover:text-icon-btn-hover" onClick={onVerContacto}>
                    <svg viewBox="0 0 20 20" className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="currentColor" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path> </g></svg>
                </btn>
                <IconFavorite favorite={favorite} onClick={() => onFavorite(id)} />
            </div>
        </div>
    );
}