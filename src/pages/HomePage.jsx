import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import phone from "../assets/phone.png";
import SplashScreen from '../components/SplashScreen.jsx';
import { fetchContacts } from '../services/contactService.js';
import { FetchError } from '../utils/FetchError.js';
import ErrorScreen from '../components/ErrorScreen.jsx';


function HomePage() {

  const [loading, setLoading] = useState(true); // Spinner activo
  const [error, setError] = useState(null);
  const [estadoContactos, setContacto] = useState(
    []
  );

  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    contacts: 0,
    categories: 0,
    searches: 0
  });

  
  
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


  // Animación de contadores al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        contacts: 150,
        categories: 5,
        searches: 1000
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);


  const manejarClick = () => {
    navigate("contactos");           // ejecuta la redirección
  };

    const manejarClick2 = () => {
    navigate("sobremi");           // ejecuta la redirección
  };


  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      title: "Favoritos",
      description: "Marca tus contactos más importantes como favoritos para acceso rápido",
      color: "text-secondary-yellow"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
        </svg>
      ),
      title: "Búsqueda Rápida",
      description: "Encuentra cualquier contacto por nombre, teléfono o relación",
      color: "text-secondary-blue"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      title: "Categorización",
      description: "Organiza tus contactos por familia, trabajo, amigos y más",
      color: "text-secondary-purple"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
      ),
      title: "Gestión Completa",
      description: "Añade, edita y elimina contactos con facilidad y seguridad",
      color: "text-secondary-green"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {loading ? (
        <SplashScreen />
      ) : error ? (
        <ErrorScreen codigo={error.codigo} descripcion={error.descripcion} />
      ) : (
          <>
            <Header page="home" contactos={estadoContactos}/>

            <section className="flex-1 relative">
              {/* Radial Gradient Background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `
            radial-gradient(
              125% 125% at 50% 100%,
              rgba(34, 197, 94, 0.25),
              transparent 65%
            )
          `,
                  filter: "blur(50px)",
                  backgroundRepeat: "no-repeat",
                }}
              />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center size-25 justify-center  mb-2">
                      <img src={phone} alt="Logo Agenda de Contactos" className='p-3' />
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6"> Bienvenido a tu
                    <span className="block text-secondary-green">Agenda Personal</span>
                  </h1>
                  <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"> Organiza, gestiona y mantén siempre cerca a las personas más importantes de tu vida. Una interfaz simple y poderosa para todos tus contactos. </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button  onClick={manejarClick} className="bg-secondary-green hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer" > Ver Mis Contactos
                    </button>
                    <button onClick={manejarClick2} className="bg-white hover:bg-gray-50 text-text-primary font-semibold px-8 py-3 rounded-lg border border-border transition-all duration-200 shadow-lg cursor-pointer"> Conocer Más </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                    Funcionalidades Principales
                  </h2>
                  <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    Descubre todas las herramientas que tenemos para hacer más fácil la gestión de tus contactos
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-bg-primary p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    >
                      <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-bg-secondary">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                    Estadísticas de la Plataforma
                  </h2>
                  <p className="text-lg text-text-secondary">
                    Números que demuestran la eficiencia de nuestro sistema
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-border">
                    <div className="text-4xl md:text-5xl font-bold text-secondary-green mb-2">
                      {animatedStats.contacts.toLocaleString()}+
                    </div>
                    <div className="text-lg font-semibold text-text-primary mb-2">Contactos Gestionados</div>
                    <div className="text-text-secondary">Capacidad para miles de contactos</div>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-border">
                    <div className="text-4xl md:text-5xl font-bold text-secondary-blue mb-2">
                      {animatedStats.categories}
                    </div>
                    <div className="text-lg font-semibold text-text-primary mb-2">Categorías Disponibles</div>
                    <div className="text-text-secondary">Familia, Trabajo, Amigos y más</div>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-border">
                    <div className="text-4xl md:text-5xl font-bold text-secondary-purple mb-2">
                      {animatedStats.searches.toLocaleString()}+
                    </div>
                    <div className="text-lg font-semibold text-text-primary mb-2">Búsquedas Realizadas</div>
                    <div className="text-text-secondary">Búsqueda rápida y eficiente</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  ¿Listo para organizar tus contactos?
                </h2>
                <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                  Comienza ahora y experimenta la forma más eficiente de gestionar tu agenda personal
                </p>
                <button
 onClick={manejarClick}
                  className="bg-secondary-green hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg cursor-pointer"
                >
                  Comenzar Ahora
                </button>
              </div>
            </section>

            {/* Footer */}
            <Footer />
          </>

        )
      }


    </div>
  );
}

export default HomePage;