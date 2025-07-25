import { fetchContactById, fetchContacts, deleteContact } from '../services/contactService.js';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
//import user from "../assets/usuario.png";
import BadgeRelacion from '../components/BadgeRelacion.jsx';
import SplashScreen from '../components/SplashScreen.jsx';
import ErrorScreen from '../components/ErrorScreen.jsx';
import { FetchError } from '../utils/FetchError.js';
import { useParams } from 'react-router-dom';
import { notyf } from '../utils/notificacion.jsx';
import { useNavigate } from 'react-router-dom';


function ContactDetailPage() {
    const [contact, setContacto] = useState({});
    const [loading, setLoading] = useState(true); // Spinner activo
    const [error, setError] = useState(null);


    const params = useParams();

    // Acceder a parámetros específicos:
    const { id } = params;
    const navigate = useNavigate();


    async function getContact() {
        try {
            setLoading(true);
            const contacto = await fetchContactById(id);
            //console.log(contacto);
            setContacto(contacto);
            //notyf.success(`Contacto Cargado`);
        } catch (error) {
            if (error instanceof FetchError) {
                setError({ codigo: error.codigo, descripcion: error.message });
            } else {
                setError({ codigo: "500", descripcion: "Error inesperado. Revisa tu conexión o intenta más tarde." });
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!/^\d+$/.test(id)) {
            setError({
                codigo: "400",
                descripcion: "ID inválido. La ruta debe contener un número.",
            });
            setLoading(false);
            return;
        }

        getContact(); // Llamado inicial y cada cambio de ID
    }, [id]);


    const formatDate = (dateString) => {
        if (!dateString) return "No especificado";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };



    const getInitials = (name) => {
        if (!name) return "??";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleCall = () => {
        window.open(`tel:${contact.phonenumber}`, '_self');
    };

    const handleEmail = () => {
        window.open(`mailto:${contact.email}`, '_self');
    };

    const handleWhatsApp = () => {
        window.open(`https://wa.me/51${contact.phonenumber}`, '_blank');
    };



    async function manejadorEliminarContacto() {
        // Activar loading inmediatamente
        setLoading(true);
        setError(null);
        try {
            const contactos = await fetchContacts();
            // Ordenar la lista por ID ascendente
            const contactosOrdenados = contactos.sort((a, b) => a.id - b.id);
            const indexActual = contactosOrdenados.findIndex(c => c.id === contact.id);
            await deleteContact(contact.id);
             if (indexActual < contactosOrdenados.length - 1) {
                const siguiente = contactosOrdenados[indexActual + 1];
                navigate(`/contacto/${siguiente.id}`);
            } else {
                // Llegaste al final: opcional → volver al inicio
                const primero = contactosOrdenados[0];
                navigate(`/contacto/${primero.id}`);
            }
            notyf.success("Contacto eliminado");
        } catch (error) {
            if (error instanceof FetchError) {
                setError({ codigo: error.codigo, descripcion: error.message });
            } else {
                setError({ codigo: "500", descripcion: "Error inesperado. Revisa tu conexión o intenta más tarde." });
            }
            setLoading(false); // Solo desactivar loading si hay error
        }
    }


    async function irAlAnterior() {
        // Activar loading inmediatamente
        setLoading(true);
        setError(null);

        const idActual = contact.id;
        try {
            const contactos = await fetchContacts();
            // Ordenar la lista por ID ascendente
            const contactosOrdenados = contactos.sort((a, b) => a.id - b.id);
            const indexActual = contactosOrdenados.findIndex(c => c.id === idActual);
            console.log(contactosOrdenados[indexActual - 1])
            // Buscar el contacto anterior, si existe
            if (indexActual > 0) {
                const anterior = contactosOrdenados[indexActual - 1];
                navigate(`/contacto/${anterior.id}`);
            } else {
                // Llegaste al inicio: volver al final
                const ultimo = contactosOrdenados[contactosOrdenados.length - 1];
                navigate(`/contacto/${ultimo.id}`);
            }

        } catch (error) {
            if (error instanceof FetchError) {
                setError({ codigo: error.codigo, descripcion: error.message });
            } else {
                setError({ codigo: "500", descripcion: "Error inesperado. Revisa tu conexión o intenta más tarde." });
            }
            setLoading(false); // Solo desactivar loading si hay error
        }
    }

    async function irAlSiguiente() {
        // Activar loading inmediatamente
        setLoading(true);
        setError(null);

        const idActual = contact.id;
        try {
            const contactos = await fetchContacts();

            // Ordenar la lista por ID ascendente
            const contactosOrdenados = contactos.sort((a, b) => a.id - b.id);
            const indexActual = contactosOrdenados.findIndex(c => c.id === idActual);

            // Buscar el contacto siguiente, si existe
            if (indexActual < contactosOrdenados.length - 1) {
                const siguiente = contactosOrdenados[indexActual + 1];
                navigate(`/contacto/${siguiente.id}`);
            } else {
                // Llegaste al final: opcional → volver al inicio
                const primero = contactosOrdenados[0];
                navigate(`/contacto/${primero.id}`);
            }

        } catch (error) {
            if (error instanceof FetchError) {
                setError({ codigo: error.codigo, descripcion: error.message });
            } else {
                setError({ codigo: "500", descripcion: "Error inesperado. Revisa tu conexión o intenta más tarde." });
            }
            setLoading(false); // Solo desactivar loading si hay error
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {loading ? (
                <SplashScreen />
            ) : error ? (
                <ErrorScreen codigo={error.codigo} descripcion={error.descripcion} />
            ) : (
                <>
                    <Header page="home" />

                    {/* Main Content */}
                    <div className=" mx-auto csm:px-6 lg:px-8 py-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                            <div className="lg:col-span-2 space-y-4">

                                <div className="bg-white rounded-md shadow-sm border border-border p-8">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white bg-icon-btn text-2xl font-bold shadow-lg">
                                                {getInitials(contact.nombre)}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 ">
                                                <BadgeRelacion tipoRelacion={contact.relacion} />
                                            </div>
                                        </div>

                                        {/* Basic Info */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h1 className="text-3xl font-bold text-text-primary mb-2">
                                                {contact.nombre}
                                            </h1>
                                            {contact.company && (
                                                <p className="text-lg text-text-secondary mb-4">
                                                    {contact.direccion}
                                                </p>
                                            )}

                                            {/* Quick Actions */}
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                                <button
                                                    onClick={handleCall}
                                                    className="flex items-center gap-2 border border-secondary-green hover:bg-secondary-green text-secondary-green hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                    </svg>
                                                    Llamar
                                                </button>
                                                <button
                                                    onClick={handleWhatsApp}
                                                    className="flex items-center gap-2 bg-secondary-green hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
                                                    </svg>
                                                    WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="bg-white rounded-md shadow-sm border border-border p-6">
                                    <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                        Información de Contacto
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Phone */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 text-text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                </svg>

                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Teléfono</p>
                                                <p className="text-text-secondary">{contact.telefono}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 text-text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                </svg>

                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Correo electrónico</p>
                                                <button
                                                    onClick={handleEmail}
                                                    className="cursor-pointer text-text-secondary"
                                                >
                                                    {contact.correo}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Company */}
                                        {contact.company && (
                                            <div className="flex items-start gap-3 ">
                                                <div className="p-2 text-text-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-text-primary">Empresa</p>
                                                    <p className="text-text-secondary">{contact.direccion}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Birthday */}
                                        {contact.fechaCumple && (
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 text-text-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                                                    </svg>

                                                </div>
                                                <div>
                                                    <p className="font-medium text-text-primary">Cumpleaños</p>
                                                    <p className="text-text-secondary">{formatDate(contact.fechaCumple)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Actions & Metadata */}
                            <div className="space-y-4">

                                {/* Action Buttons */}
                                {/* Tarjetas de acción */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg border border-border hover:border-blue-300 p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                                {/* Icono editar */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>

                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-text-primary">Editar Contacto</h4>
                                                {/* <p className="text-sm text-text-secondary">Modifica los datos del contacto seleccionado.</p> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div onClick={manejadorEliminarContacto} className="bg-white rounded-lg border border-border hover:border-red-300 p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-50 text-red-600 rounded-md">
                                                {/* Icono eliminar */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-text-primary">Eliminar Contacto</h4>
                                                {/* <p className="text-sm text-text-secondary">Elimina el contacto actual de la agenda.</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="bg-white rounded-md shadow-sm border border-border p-6">
                                    <h3 className="text-lg font-semibold text-text-primary mb-4">Información adicional</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-text-secondary mb-1">Creado el</p>
                                            <p className="text-text-primary">{formatDate(contact.creado)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-text-secondary mb-1">Última actualización</p>
                                            <p className="text-text-primary">{formatDate(contact.actualizado)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-text-secondary mb-1">ID de contacto</p>
                                            <p className="text-text-primary font-mono text-sm">#{contact.id.toString().padStart(6, '0')}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* Navegación */}
                    <div className="flex justify-between gap-2 flex-shrink-0  px-4 sm:px-6 lg:px-8 pb-6">
                        <button
                            title='Contacto anterior'
                            onClick={irAlAnterior}
                            className="hover:opacity-70 transition-opacity disabled:opacity-50"
                            disabled={loading}
                        >
                            <svg className="size-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M16.75 12H6.75M6.75 12L9.5 14.75M6.75 12L9.5 9.25" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="#000000" strokeWidth="1.5"></path>
                                </g>
                            </svg>
                        </button>
                        <button
                            title='Contacto siguiente'
                            onClick={irAlSiguiente}
                            className="hover:opacity-70 transition-opacity disabled:opacity-50"
                            disabled={loading}
                        >
                            <svg className="size-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M6.75 12H16.75M16.75 12L14 14.75M16.75 12L14 9.25" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="#000000" strokeWidth="1.5"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default ContactDetailPage;