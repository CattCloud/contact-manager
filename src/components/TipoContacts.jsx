import ListHeader from "./ListHeader";
import ContactCard from "./ContactCard";


function TipoContacts({ titulo, color, contactos }) {
    return (
        <div className="bg-bg-secondary p-2 rounded-md space-y-4 w-content">
            <ListHeader titulo={titulo} color={color} />
            <div className="space-y-2">
                {contactos.map((contacto, index) => (
                    <ContactCard
                        key={index}
                        nombre={contacto.nombre}
                        correo={contacto.correo}
                        telefono={contacto.telefono}
                    />
                ))}
            </div>

        </div>
    );
}

export default TipoContacts;