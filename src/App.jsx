import Header from './components/Header'
import Footer from './components/Footer'
import TipoContacts from './components/TipoContacts.jsx'
import ListContacts from './components/ListContacs.jsx';
import { useState } from "react";
import ControlBar from './components/ControlBar.jsx';
import BotonAllFavorite from './components/allFavorite.jsx';
import ModalView from './components/ModalContact.jsx';
import BotonAddContacto from './components/addContact.jsx';


export default function App() {

  const [estadoContactos, setContacto] = useState(
    []
  );

  const [estadoModal, setModalEstado] = useState(false)

  const [estadoFiltro, setFiltro] = useState("todos");

  console.log(estadoFiltro);

  const contactosFiltrados =
    estadoFiltro === "favoritos"
      ? estadoContactos.filter((c) => c.favorite)
      : estadoContactos;

  const cantidadFavoritos = estadoContactos.filter((c) => c.favorite).length;
  const cantidadContactos = estadoContactos.length;


  function toggleFavorite(id) {
    setContacto((estadoAnterior) => {
      // Creamos una nueva lista de contactos
      const nuevaLista = estadoAnterior.map((contacto) => {
        // Si el ID coincide, actualizamos el favorito
        if (contacto.id === id) {
          return {
            ...contacto,
            favorite: !contacto.favorite, // Cambiamos true ↔ false
          };
        } else {
          return contacto;
        }
      });

      return nuevaLista;
    });
  }

  function todosFavoritos() {
    setContacto((estadoAnterior) => {
      // Creamos una nueva lista de contactos
      const nuevaLista = estadoAnterior.map((contacto) => {
        return {
          ...contacto,
          favorite: true, // Cambiamos true ↔ false
        }
      });
      return nuevaLista;
    });
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

  function manejadorNuevoContacto(nuevoContacto){
    const contactoListo ={id:estadoContactos.length+1,...nuevoContacto,favorite:false}
    const nuevoEstadoContacto = [...estadoContactos, contactoListo]; 
    setContacto(nuevoEstadoContacto);
    cerrarModal();
  }

  
  const mensajeNoContactos=estadoFiltro=="todos"?"No hay contactos":"No hay contactos favoritos";


  return (
    <div className='space-y-2'>
      <Header />
      <main className='space-y-3 min-h-[78vh] '>
        <div className='px-4 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <ControlBar onAction={filterContactos} filtroActivo={estadoFiltro} />
            <BotonAllFavorite onAction={todosFavoritos} />
            <BotonAddContacto onAction={abrirModal} />
          </div>
          <p className='text-text-secondary'>{cantidadFavoritos} de {cantidadContactos} contactos son favoritos</p>
        </div>
        <ListContacts contactos={contactosFiltrados} onFavorite={toggleFavorite} mensajeIsEmpty={mensajeNoContactos}/>
        <ModalView title="Nuevo Contacto" isOpen={estadoModal} onClose={cerrarModal} onAddContact={manejadorNuevoContacto}/>
      </main>
      <Footer />
    </div>
  )
}



