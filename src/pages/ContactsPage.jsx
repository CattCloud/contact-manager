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


function ContactsPage() {

  const [estadoContactos, setContacto] = useState(
    //managerls.obtener()
    []
  );

  const [loading, setLoading] = useState(true); // Spinner activo

  const [error, setError] = useState(null);


  async function getContacts() {
    try {
      setLoading(true);
      const contactos = await fetchContacts();
      setContacto(contactos);
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

  const [estadoFiltro, setFiltro] = useState("todos");

  const [contactoElegido, setContactoElegido] = useState(estadoContactos.length ? estadoContactos[0] : null);

  const [searchEstado, setSearch] = useState("");

  const [modoModal, setModoModal] = useState("crear");

  const [contactoAEditar, setContactoAEditar] = useState(null);

  const textoBuscado = searchEstado.trim().toLowerCase();

  const contactosFiltrados = estadoContactos
    .filter((c) => {
      // Primero aplicamos el filtro de favoritos
      return estadoFiltro === "favoritos" ? c.favorite : true;
    })
    .filter((c) => {
      // Si no hay búsqueda, mostrar todos
      if (!textoBuscado) return true;
      // Buscar por nombre, teléfono, relación
      return (
        c.nombre.toLowerCase().includes(textoBuscado) ||
        c.telefono.includes(textoBuscado) ||
        c.relacion?.toLowerCase().includes(textoBuscado)
      );
    }).reverse();

  useEffect(() => {
    if (contactosFiltrados.length) {
      setContactoElegido((prev) => {
        const sigueVisible = contactosFiltrados.some(c => c.id === prev?.id);
        return sigueVisible ? prev : contactosFiltrados[0];
      });
    } else {
      setContactoElegido(null);
    }
  }, [estadoFiltro, searchEstado, estadoContactos]);


  const cantidadFavoritos = estadoContactos.filter((c) => c.favorite).length;
  const cantidadContactos = estadoContactos.length;





  function toggleFavorite(id) {
    setContacto((estadoAnterior) => {
      // Creamos una nueva lista de contactos
      const nuevaLista = estadoAnterior.map((contacto) => {
        // Si el ID coincide, actualizamos el favorito
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
        // Creamos una nueva lista de contactos
        const nuevaLista = estadoAnterior.map((contacto) => {
          if (contactoElegido && contacto.id == contactoElegido.id) {
            setContactoElegido({
              ...contacto,
              favorite: true,
            });
          }
          return {
            ...contacto,
            favorite: true, // Cambiamos true ↔ false
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
    // Validar duplicado por nombre
    const nombreDuplicado = estadoContactos.some(
      (c) =>
        c.id !== id && // 👈 excluye el mismo contacto
        c.nombre.trim().toLowerCase() === nombreNormalizado
    );
    if (nombreDuplicado) {
      notyf.error("Ya existe un contacto con ese nombre");
      return false;
    }
    // Validar duplicado por teléfono
    const telefonoDuplicado = estadoContactos.some(
      (c) =>
        c.id !== id && // 👈 excluye el mismo contacto
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
      setLoading(true);
      // Enviar a la API
      const contactoCreado = await createContact(nuevoContacto);
      // Si la API responde con otro esquema, transformalo si hace falta
      const contactoFinal = {
        id: contactoCreado.id,
        nombre: contactoCreado.fullname,
        telefono: contactoCreado.phonenumber,
        relacion: contactoCreado.type,
        correo: contactoCreado.email,
        direccion: contactoCreado.company,
        fechaCumple: contactoCreado.birthday,
        favorite: false
      };

      // Actualizar estado local
      const nuevoEstado = [...estadoContactos, contactoFinal];
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      setContactoElegido(contactoFinal);

      cerrarModal();
      notyf.success("Contacto registrado correctamente");

    } catch (error) {
      notyf.error(`Error al registrar contacto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }




  function siguienteContacto() {
    setContactoElegido((prev) => {
      let indice = contactosFiltrados.findIndex(contacto => contacto.id == prev.id);
      if (indice == contactosFiltrados.length - 1) {
        return contactosFiltrados[0];
      } else {
        return contactosFiltrados[indice + 1];
      }
    });
  }


  function anteriorContacto() {
    setContactoElegido((prev) => {
      let indice = contactosFiltrados.findIndex(contacto => contacto.id == prev.id);
      if (indice == 0) {
        return contactosFiltrados[contactosFiltrados.length - 1];
      } else {
        return contactosFiltrados[indice - 1];
      }
    });
  }


  function manejadorSearch(e) {
    const value_search = e.target.value;
    setSearch(value_search);
    //setContactoElegido(contacto);

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
      setLoading(true);
      // Llamar al API para editar contacto
      const contactoActualizado = await updateContact(contactoEditado);
      // Actualizar estado
      const nuevoEstado = estadoContactos.map((c) =>
        c.id === contactoActualizado.id ? contactoActualizado : c
      );
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      setContactoElegido(contactoActualizado);
      cerrarModal();
      notyf.success("Contacto editado correctamente");
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




  async function manejadorEliminarContacto(id) {
    try {
      setLoading(true);

      await deleteContact(id);

      const nuevoEstado = estadoContactos.filter(c => c.id !== id);
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      notyf.success("Contacto eliminado");

      // Si el contacto eliminado era el que estaba en detalle
      if (contactoElegido?.id === id) {
        setContactoElegido(nuevoEstado[0] || null);
      }
    } catch (error) {
      notyf.error(`Error al eliminar contacto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }


  function eliminarAllContacts() {
    if (estadoContactos.length) {
      setContacto([])
      managerls.guardar([]);
      notyf.success("Contactos eliminados correctamente");
    }
    else {
      notyf.error("No hay contactos que eliminar");

    }

  }

  return (
    <div className="h-screen flex flex-col">
      {loading ? (
        <SplashScreen />
      ) : error ? (
        <ErrorScreen codigo={error.codigo} descripcion={error.descripcion} />
      ) : (
        <>
          <Header />
          <main className="flex-1 grid md:grid-cols-[63%_35%] lg:grid-cols-[73%_25%] grid-cols-1 gap-2 overflow-hidden">
            <div className="flex flex-col space-y-3 overflow-hidden">
              <div className="ml-4 mr-4 md:pr-0 flex lg:justify-between gap-2 lg:items-center flex-col lg:flex-row border-b-2 border-border pb-2 flex-shrink-0">
                <div className="flex gap-1 items-center justify-between">
                  <ControlBar
                    onAction={filterContactos}
                    filtroActivo={estadoFiltro}
                    cantidadFavoritos={cantidadFavoritos}
                    cantidadContactos={cantidadContactos}
                  />
                  <div className="flex gap-1">
                    <BotonAllFavorite onAction={todosFavoritos} />
                    <BotonAddContacto onAction={abrirModalCrear} />
                    <BotonDeleteAll onAction={eliminarAllContacts} />
                  </div>
                </div>
                <SearchContactInput valorSearch={searchEstado} onSearch={manejadorSearch} />
              </div>

              <div className="flex-1 overflow-y-auto px-4">
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
            </div>

            <ContactoDetalle
              contacto={contactoElegido}
              onToggleFavorito={toggleFavorite}
              onAnteriorContacto={anteriorContacto}
              onSiguientContacto={siguienteContacto}
            />
            <ModalView
              title={modoModal === "editar" ? "Editar Contacto" : "Nuevo Contacto"}
              isOpen={estadoModal}
              onClose={cerrarModal}
              contactoActual={contactoAEditar}
              modo={modoModal}
              onAddContact={modoModal === "editar" ? manejadorEditarContacto : manejadorNuevoContacto}
            />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}


export default ContactsPage;
