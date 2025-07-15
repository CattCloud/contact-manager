import Header from './components/Header'
import Footer from './components/Footer'
import ListContacts from './components/ListContacs.jsx';
import { useState, useEffect } from "react";
import ControlBar from './components/ControlBar.jsx';
import BotonAllFavorite from './components/allFavorite.jsx';
import ModalView from './components/ModalContact.jsx';
import BotonAddContacto from './components/addContact.jsx';
import ContactoDetalle from './components/ContactoDetalle.jsx';
import { notyf } from './utils/notificacion.jsx';
import SearchContactInput from './components/SearchContact.jsx';
import { managerls } from './utils/localStorageManager.js';
import BotonDeleteAll from './components/allDelete.jsx';

export default function App() {

  const [estadoContactos, setContacto] = useState(
    managerls.obtener()
  );

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
    });

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


  function manejadorNuevoContacto(nuevoContacto) {
    if (validarDuplicado(nuevoContacto)) {
      // Si pasa todo, se crea el contacto
      const contactoListo = {
        id: estadoContactos.length + 1,
        ...nuevoContacto,
        favorite: false,
      };
      const nuevoEstadoContacto = [...estadoContactos, contactoListo];
      setContacto(nuevoEstadoContacto);
      cerrarModal();
      managerls.guardar(nuevoEstadoContacto);
      notyf.success("Contacto registrado correctamente");
      console.log(estadoContactos.length);
      setContactoElegido(nuevoEstadoContacto[nuevoEstadoContacto.length - 1]);
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


  function manejadorEditarContacto(contacto) {
    if (validarDuplicado(contacto)) {
      const nuevoEstado = estadoContactos.map((c) =>
        c.id === contacto.id ? contacto : c
      );
      setContacto(nuevoEstado);
      managerls.guardar(nuevoEstado);
      cerrarModal();
      setContactoElegido(contacto);
      notyf.success("Contacto editado correctamente");
    }
  }

  function manejadorEliminarContacto(id) {
    const nuevoEstado = estadoContactos.filter(c => c.id !== id);
    setContacto(nuevoEstado);
    managerls.guardar(nuevoEstado);
    notyf.success("Contacto eliminado correctamente");
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
    <div className='space-y-2'>
      <Header />
      <main className='grid md:grid-cols-[73%_25%] grid-cols-1 gap-2 min-h-[82vh]'>
        <div className='space-y-3'>
          <div className='ml-4 mr-4 md:pr-0 flex lg:justify-between gap-2 lg:items-center flex-col lg:flex-row border-b-2 border-border pb-2'>
            <div className='flex gap-1 items-center justify-between'>
              <ControlBar onAction={filterContactos} filtroActivo={estadoFiltro} cantidadFavoritos={cantidadFavoritos} cantidadContactos={cantidadContactos} />
              <div className='flex gap-1'>
                <BotonAllFavorite onAction={todosFavoritos} />
                <BotonAddContacto onAction={abrirModalCrear} />
                <BotonDeleteAll onAction={eliminarAllContacts}/>
              </div>
            </div>
            <SearchContactInput valorSearch={searchEstado} onSearch={manejadorSearch} />
          </div>
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
        <ContactoDetalle contacto={contactoElegido} onToggleFavorito={toggleFavorite} onAnteriorContacto={anteriorContacto} onSiguientContacto={siguienteContacto} />
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
    </div>
  )
}



