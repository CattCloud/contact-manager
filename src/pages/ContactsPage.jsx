import Header from '../components/Header'
import Footer from '../components/Footer'
import ListContacts from '../components/ListContacs.jsx';
import { useState, useEffect } from "react";
import ControlBar from '../components/ControlBar.jsx';
import BotonAllFavorite from '../components/allFavorite.jsx';
import ModalView from '../components/ModalContact.jsx';
import BotonAddContacto from '../components/addContact.jsx';
import ContactoDetalle from '../components/ContactoDetalle.jsx';
import { notyf } from '../utils/notificacion.jsx';
import SearchContactInput from '../components/SearchContact.jsx';
import { managerls } from '../utils/localStorageManager.js';
import BotonDeleteAll from '../components/allDelete.jsx';
import { fetchContacts, createContact, deleteContact, updateContact } from '../services/contactService.js';
import ErrorScreen from '../components/ErrorScreen.jsx';
import { FetchError } from '../utils/FetchError.js';
import SplashScreen from '../components/SplashScreen.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Componente SkeletonCard que replica la estructura de ContactCard
function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-4 rounded-md border border-border bg-bg-primary shadow-sm">
      <div className="flex justify-between gap-1">
        <Skeleton width="60%" height={20} />
        <Skeleton width={60} height={24} borderRadius={12} />
      </div>
      <div className="flex gap-2 justify-start items-center">
        <Skeleton width={20} height={16} borderRadius={2} />
        <Skeleton width="45%" height={16} />
      </div>
      <div className="flex justify-center items-center gap-4 my-1">
        <Skeleton circle width={32} height={32} />
        <Skeleton circle width={32} height={32} />
        <Skeleton circle width={32} height={32} />
        <Skeleton circle width={32} height={32} />
      </div>
    </div>
  );
}

// Componente que renderiza múltiples skeleton cards
function SkeletonContactsList({ count }) {
  return (
    <SkeletonTheme 
      baseColor="#f8f9fa" 
      highlightColor="#e9ecef"
      duration={1.5}
    >
      <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </SkeletonTheme>
  );
}

function ContactsPage() {
  const [estadoContactos, setContacto] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner activo para carga inicial
  const [operationLoading, setOperationLoading] = useState(false); // Nuevo estado para operaciones individuales
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  async function getContacts() {
    try {
      setLoading(true);
      const contactos = await fetchContacts();
      setContacto(contactos);
      console.log(contactos);
      notyf.success(`${contactos.length} contactos cargados`);
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

  const [estadoModal, setModalEstado] = useState(false)
  const [modoModal, setModoModal] = useState("crear");
  const [estadoFiltro, setFiltro] = useState("todos");
  const [contactoElegido, setContactoElegido] = useState(null);
  const [searchEstado, setSearch] = useState("");
  const [contactoAEditar, setContactoAEditar] = useState(null);

 
  const textoBuscado = searchEstado.trim().toLowerCase();

  const contactosFiltrados = estadoContactos
    .filter((c) => {
      return estadoFiltro === "favoritos" ? c.favorite : true;
    })
    .filter((c) => {
      if (!textoBuscado) return true;
      return (
        c.nombre.toLowerCase().includes(textoBuscado) ||
        c.telefono.includes(textoBuscado) ||
        c.relacion?.toLowerCase().includes(textoBuscado)
      );
    }).reverse();

  useEffect(() => {
    // Solo log si hay operationLoading para reducir ruido
    if (operationLoading) {
      console.log("🛡️ useEffect BLOQUEADO por operationLoading - scroll preservado:", window.scrollY);
    }
    
    // No ejecutar durante operaciones de loading para preservar el scroll
    if (operationLoading) return;
    
    if (contactosFiltrados.length) {
      /*setContactoElegido((prev) => {
        const sigueVisible = contactosFiltrados.some(c => c.id === prev?.id);
        const nuevoContacto = sigueVisible ? prev : contactosFiltrados[0];
        
        // Solo log si hay cambio real
        if (prev?.id !== nuevoContacto?.id) {
          console.log("📋 Cambio de contactoElegido:", {
            prevId: prev?.id,
            nuevoId: nuevoContacto?.id,
            scrollY: window.scrollY
          });
        }
        
        return nuevoContacto;
      });*/
      
    } else {
      setContactoElegido(null);
    }
  }, [estadoFiltro, searchEstado, estadoContactos, operationLoading]);

  const cantidadFavoritos = estadoContactos.filter((c) => c.favorite).length;
  const cantidadContactos = estadoContactos.length;

  function toggleFavorite(id) {
    setContacto((estadoAnterior) => {
      const nuevaLista = estadoAnterior.map((contacto) => {
        if (contacto.id === id) {
          const editContacto = { ...contacto, favorite: !contacto.favorite };
          if (contactoElegido && contacto.id == contactoElegido.id) {
            setContactoElegido(editContacto);
          }
          return editContacto;
        } else {
          return contacto;
        }
      });
      managerls.guardar(nuevaLista);
      return nuevaLista;
    });
  }


  function todosFavoritos() {
    if (estadoContactos.length) {
      setContacto((estadoAnterior) => {
        const nuevaLista = estadoAnterior.map((contacto) => {
          if (contactoElegido && contacto.id == contactoElegido.id) {
            setContactoElegido({
              ...contacto,
              favorite: true,
            });
          }
          return {
            ...contacto,
            favorite: true,
          }
        });
        managerls.guardar(nuevaLista);
        return nuevaLista;
      });
      notyf.success("Listo! Todos los contactos son favoritos");
    } else {
      notyf.error("No hay contactos para marcar como favoritos");
    }
  }

  function filterContactos(valorFiltro) {
    setFiltro(valorFiltro);
  }

  function abrirModalCrear() {
    setContactoAEditar(null);
    setModoModal("crear");
    setModalEstado(true);
  }

  function cerrarModal() {
    setModalEstado(false);
  }

  function validarDuplicado(contacto) {
    const { id, nombre, telefono } = contacto;
    const nombreNormalizado = nombre.trim().toLowerCase();
    const telefonoLimpio = telefono.replace(/\D/g, "");
    
    const nombreDuplicado = estadoContactos.some(
      (c) =>
        c.id !== id &&
        c.nombre.trim().toLowerCase() === nombreNormalizado
    );
    if (nombreDuplicado) {
      notyf.error("Ya existe un contacto con ese nombre");
      return false;
    }
    
    const telefonoDuplicado = estadoContactos.some(
      (c) =>
        c.id !== id &&
        c.telefono.replace(/\D/g, "") === telefonoLimpio
    );
    if (telefonoDuplicado) {
      notyf.error("Ya existe un contacto con ese número de teléfono");
      return false;
    }
    return true;
  }

  async function manejadorNuevoContacto(nuevoContacto) {
    if (!validarDuplicado(nuevoContacto)) return;
    
    try {
      setOperationLoading(true);
      cerrarModal(); // Cerrar modal inmediatamente para mostrar skeleton
      
      // Simular un pequeño delay para mostrar el skeleton
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const contactoCreado = await createContact(nuevoContacto);
      
      // Actualizar en batch
      const nuevoEstado = [...estadoContactos, contactoCreado];
      setContacto(() => {
        managerls.guardar(nuevoEstado);
        return nuevoEstado;
      });
      
      setContactoElegido(contactoCreado);
      notyf.success("Contacto registrado correctamente");

      // Delay para asegurar que React termine todos los updates
      await new Promise(resolve => setTimeout(resolve, 300));

    } catch (error) {
      notyf.error(`Error al registrar contacto: ${error.message}`);
    } finally {
      setOperationLoading(false);
    }
  }

  function manejadorSearch(e) {
    const value_search = e.target.value;
    setSearch(value_search);
  }

  const mensajeNoContactos = estadoFiltro == "todos" ? "No hay contactos" : "No hay contactos favoritos";

  function seleccionarContacto(contacto) {
    setContactoElegido(contacto);
  }

  function abrirModalEdicion(id) {
    const contactoAEditar = estadoContactos.find(c => c.id === id);
    setContactoAEditar(contactoAEditar);
    setModoModal("editar");
    setModalEstado(true);
  }

  async function manejadorEditarContacto(contactoEditado, isEdit) {
    console.log("🔧 INICIO manejadorEditarContacto:", {
      contactoEditadoId: contactoEditado.id,
      isEdit,
      contactoElegidoId: contactoElegido?.id,
      scrollY: window.scrollY
    });

    if (!isEdit) {
      cerrarModal();
      notyf.open({
        type: 'info',
        message: 'No se modificó ningún valor del contacto.'
      });
      return;
    }
    if (!validarDuplicado(contactoEditado)) return;

    try {
      console.log("🔧 Estableciendo operationLoading = true");
      setOperationLoading(true);
      
      console.log("🔧 Cerrando modal");
      cerrarModal();
      
      console.log("🔧 Scroll antes del delay:", window.scrollY);
      
      // Simular un pequeño delay para mostrar el skeleton
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("🔧 Scroll después del delay:", window.scrollY);
      console.log("🔧 Llamando a updateContact");
      
      const contactoActualizado = await updateContact(contactoEditado);
      
      console.log("🔧 Contacto actualizado recibido:", contactoActualizado.id);
      
      // Actualizar estado de manera síncrona
      const nuevoEstado = estadoContactos.map((c) =>
        c.id === contactoActualizado.id ? contactoActualizado : c
      );
      
      console.log("🔧 Actualizando estado de contactos");
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      
      console.log("🔧 Scroll después de actualizar estado:", window.scrollY);
      
      notyf.success("Contacto editado correctamente");
      
      // Delay para asegurar que React termine todos los updates
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log("🔧 Scroll antes de finalizar:", window.scrollY);
      
    } catch (error) {
      console.error("🔧 ERROR:", error);
      if (error instanceof FetchError) {
        setError({ codigo: error.codigo, descripcion: error.message });
      } else {
        setError({ codigo: "500", descripcion: "Error inesperado. Revisa tu conexión o intenta más tarde." });
      }
    } finally {
      console.log("🔧 Estableciendo operationLoading = false");
      console.log("🔧 Scroll al finalizar:", window.scrollY);
      setOperationLoading(false);
    }
  }

  async function manejadorEliminarContacto(id) {
    try {
      setOperationLoading(true);
      
      // Simular un pequeño delay para mostrar el skeleton
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      await deleteContact(id);

      const nuevoEstado = estadoContactos.filter(c => c.id !== id);
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      notyf.success("Contacto eliminado");

      if (contactoElegido?.id === id) {
        setContactoElegido(nuevoEstado[0] || null);
      }

      // Delay adicional para asegurar que el estado se actualice
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      notyf.error(`Error al eliminar contacto: ${error.message}`);
    } finally {
      setOperationLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <SplashScreen />
      ) : error ? (
        <ErrorScreen codigo={error.codigo} descripcion={error.descripcion} />
      ) : (
        <>
          <Header page={"contacts"} search={false} />
          
          {/* Sección fija con filtros y controles */}
          <div className={`sticky top-0 z-10 bg-white ${scrolled ? "shadow-sm" : ""}`}>
            <div className="px-2 sm:px-4 lg:px-6 py-3">
              <div className="flex lg:justify-between gap-2 lg:items-center flex-col lg:flex-row">
                <div className="flex gap-1 items-center justify-between">
                  <ControlBar
                    onAction={filterContactos}
                    filtroActivo={estadoFiltro}
                    cantidadFavoritos={cantidadFavoritos}
                    cantidadContactos={cantidadContactos}
                  />
                  <div className="flex gap-1">
                    {/*<BotonAllFavorite onAction={todosFavoritos} />*/}

                    <BotonAddContacto onAction={abrirModalCrear} />
                  </div>
                </div>
                <SearchContactInput valorSearch={searchEstado} onSearch={manejadorSearch} />
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <main className="flex-1 px-4 sm:px-4 lg:px-6 py-3 relative">
            {/* Skeleton overlay que preserva el scroll */}
            {operationLoading && (
              <div className="absolute inset-0 z-20 bg-white bg-opacity-95 transition-all duration-300">
                <SkeletonContactsList count={Math.max(contactosFiltrados.length, 8)} />
              </div>
            )}
            
            {/* Contenido real que siempre está presente */}
            <div className={`transition-opacity duration-300 ${operationLoading ? "opacity-10 pointer-events-none" : "opacity-100"}`}>
              <ListContacts
                search={searchEstado}
                contactos={contactosFiltrados}
                onFavorite={toggleFavorite}
                mensajeIsEmpty={mensajeNoContactos}
                onSeleccionarContacto={seleccionarContacto}
                contactoElegido={contactoElegido}
                onEditarContacto={abrirModalEdicion}
                onEliminarContacto={manejadorEliminarContacto}
              />
            </div>
          </main>

          <ModalView
            title={modoModal === "editar" ? "Editar Contacto" : "Nuevo Contacto"}
            isOpen={estadoModal}
            onClose={cerrarModal}
            contactoActual={contactoAEditar}
            modo={modoModal}
            onAddContact={modoModal === "editar" ? manejadorEditarContacto : manejadorNuevoContacto}
          />

          <Footer />
        </>
      )}
    </div>
  );
}

export default ContactsPage;