import Header from "../components/Header";
import Footer from "../components/Footer";
import user from "../assets/aboutme.jpg";
import { useState, useEffect } from "react";
import SplashScreen from '../components/SplashScreen.jsx';
import { fetchContacts } from '../services/contactService.js';
import { FetchError } from '../utils/FetchError.js';
import ErrorScreen from '../components/ErrorScreen.jsx';

function AboutPage() {
    const [loading, setLoading] = useState(true); // Spinner activo
    const [error, setError] = useState(null);
    const [estadoContactos, setContacto] = useState(
        []
    );


    async function getContacts() {
        try {
            setLoading(true);
            const contactos = await fetchContacts();
            setContacto(contactos);
            //console.log(contactos);
            //notyf.success(`${contactos.length} contactos cargados`);
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
        getContacts();
    }, []);


    const projects = [
        {
            id: 1,
            title: "Bob Auction Platform",
            description: "MVP para gestión de ingresos y egresos de Bob Subastas, empresa de economía circular especializada en intermediación de venta de activos en desuso.",
            url: "https://cattcloud.github.io/bobAuction-Platform/",
            tech: ["JavaScript", "HTML", "CSS"],
            color: "text-secondary-yellow"
        },
        {
            id: 2,
            title: "WhatsApp Templates",
            description: "Sistema de gestión de plantillas utilizando el Patrón Store para manejo centralizado de estado sin frameworks específicos.",
            url: "https://cattcloud.github.io/whatsapp-templates/",
            tech: ["JavaScript", "Store Pattern", "DOM"],
            color: "text-secondary-yellow"
        },
        {
            id: 3,
            title: "Personal Budget",
            description: "Aplicación para registro de movimientos financieros con resumen general y por tipo, mostrando saldo total y desglose detallado.",
            url: "https://cattcloud.github.io/personal-budget/",
            tech: ["JavaScript", "Local Storage", "UI/UX"],
            color: "text-secondary-yellow"
        }
    ];



    return (
        <div className="min-h-screen bg-bg-primary">
            {loading ? (
                <SplashScreen />
            ) : error ? (
                <ErrorScreen codigo={error.codigo} descripcion={error.descripcion} />
            ) : (
                <>
                    <Header page="home" contactos={estadoContactos} />
                    {/* Hero Section */}
                    <section className="relative py-16 lg:py-24">
                        {/* Background Gradient */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                background: `
                        radial-gradient(
                            125% 125% at 50% 100%,
                            rgba(239, 140, 36, 0.2),
                            transparent 65%
                        )
                        `,
                                filter: "blur(60px)",
                                backgroundRepeat: "no-repeat",
                            }}
                        />



                        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                {/* Profile Image */}
                                <div className="relative inline-block mb-8">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <img
                                            src={user}
                                            alt="Foto del creador"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>


                                <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                                    Erick<span className=" text-secondary-orange"> Dreyk</span>

                                </h1>

                                <p className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
                                    Mitad desarrollador, mitad discípulo. Con el corazón encendido por su fe y la mente enfocada en su crecimiento,
                                    no solo escribo código: <span className="text-secondary-orange font-semibold">construyo propósito</span>.
                                    De día, levanto sistemas web con JavaScript, React y Tailwind; de noche, afino mi alma en oración y disciplina.
                                </p>

                                <div className="flex flex-row gap-4 justify-center">
                                    <a
                                        href="https://facebook.com/tuusuario"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-secondary-orange hover:bg-orange-500 p-5 flex items-center   text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        <svg fill="currentColor" className="size-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-337 273 123.5 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path> </g></svg>                            </a>

                                    <a
                                        href="https://wa.me/tu-numero"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-secondary-orange hover:bg-orange-500 p-5 flex items-center rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg text-white"
                                    >
                                        <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="currentColor"></path> </g></svg>                            </a>
                                </div>
                            </div>
                        </div>
                    </section>



                    {/* Projects Section */}
                    <section className="py-16 bg-white">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                    Mis Proyectos
                                </h2>
                                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                    Cada proyecto refleja mi crecimiento y dedicación por crear soluciones significativas
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-bg-primary rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <div className={`${project.color} mb-4`}>
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </div>

                                            <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-secondary-orange transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded-md"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                                    
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-secondary-orange hover:text-orange-600 font-semibold text-sm transition-colors"
                                            >
                                                Ver Proyecto
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </>
            )}
        </div>
    );
}

export default AboutPage;