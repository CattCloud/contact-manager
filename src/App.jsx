import Header from './components/Header'
import Footer from './components/Footer'
import ListContacts from './components/ListContacs.jsx';
import { useState } from "react";
import ControlBar from './components/ControlBar.jsx';
import BotonAllFavorite from './components/allFavorite.jsx';
import ModalView from './components/ModalContact.jsx';
import BotonAddContacto from './components/addContact.jsx';
import ContactoDetalle from './components/ContactoDetalle.jsx';
import { notyf } from './utils/notificacion.jsx';
import SearchContactInput from './components/SearchContact.jsx';

export default function App() {

  const [estadoContactos, setContacto] = useState(
    []
  );

  const [estadoModal, setModalEstado] = useState(false)

  const [estadoFiltro, setFiltro] = useState("todos");

  const [contactoElegido, setContactoElegido] = useState(null);

  const [searchEstado, setSearch] = useState("");


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

  function abrirModal() {
    setModalEstado(true);
  }

  function cerrarModal() {
    setModalEstado(false);
  }

  function manejadorNuevoContacto(nuevoContacto) {
    const { nombre, telefono } = nuevoContacto;
    const nombreNormalizado = nombre.trim().toLowerCase();
    const telefonoLimpio = telefono.replace(/\D/g, "");

    // Validar duplicado por nombre
    const nombreDuplicado = estadoContactos.some(
      (c) => c.nombre.trim().toLowerCase() === nombreNormalizado
    );
    if (nombreDuplicado) {
      notyf.error("Ya existe un contacto con ese nombre");
      return;
    }
    // Validar duplicado por teléfono
    const telefonoDuplicado = estadoContactos.some(
      (c) => c.telefono.replace(/\D/g, "") === telefonoLimpio
    );
    if (telefonoDuplicado) {
      notyf.error("Ya existe un contacto con ese número de teléfono");
      return;
    }
    // Si pasa todo, se crea el contacto
    const contactoListo = {
      id: estadoContactos.length + 1,
      ...nuevoContacto,
      favorite: false,
    };
    const nuevoEstadoContacto = [...estadoContactos, contactoListo];
    setContacto(nuevoEstadoContacto);
    cerrarModal();
    notyf.success("Contacto registrado correctamente");
    console.log(estadoContactos.length);
    setContactoElegido(nuevoEstadoContacto[nuevoEstadoContacto.length - 1]);
  }



  function siguienteContacto() {
    setContactoElegido((prev) => {
      let indice = estadoContactos.findIndex(contacto => contacto.id == prev.id);
      if (indice == estadoContactos.length - 1) {
        return estadoContactos[0];
      } else {
        return estadoContactos[indice + 1];
      }
    });
  }


  function anteriorContacto() {
    setContactoElegido((prev) => {
      let indice = estadoContactos.findIndex(contacto => contacto.id == prev.id);
      if (indice == 0) {
        return estadoContactos[estadoContactos.length - 1];
      } else {
        return estadoContactos[indice - 1];
      }
    });
  }


  function manejadorSearch(e) {
    const value_search = e.target.value;
    setSearch(value_search);

  }


  const mensajeNoContactos = estadoFiltro == "todos" ? "No hay contactos" : "No hay contactos favoritos";

  function seleccionarContacto(contacto) {
    setContactoElegido(contacto);
  }

  return (
    <div className='space-y-2'>
      <Header cantidadFavoritos={cantidadFavoritos} cantidadContactos={cantidadContactos} />


      <main className='grid md:grid-cols-[73%_25%] grid-cols-1 gap-2 min-h-[82vh]'>
        <div className='space-y-3'>
          <div className='pl-4 pr-4 md:pr-0 flex lg:justify-between gap-2 lg:items-center flex-col lg:flex-row '>
            <div className='flex gap-1 items-center justify-between'>
              <ControlBar onAction={filterContactos} filtroActivo={estadoFiltro} />
              <div className='flex gap-1'>
                <BotonAllFavorite onAction={todosFavoritos} />
                <BotonAddContacto onAction={abrirModal} />
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
          />
        </div>
        <ContactoDetalle contacto={contactoElegido} onToggleFavorito={toggleFavorite} onAnteriorContacto={anteriorContacto} onSiguientContacto={siguienteContacto} />
        <ModalView title="Nuevo Contacto" isOpen={estadoModal} onClose={cerrarModal} onAddContact={manejadorNuevoContacto} />
      </main>
      <Footer />
    </div>
  )
}



