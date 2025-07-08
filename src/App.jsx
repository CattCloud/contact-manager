import Header from './components/Header'
import Footer from './components/Footer'
import TipoContacts from './components/TipoContacts.jsx'
import { Listacontactos } from './datos.js';
import ListContacts from './components/ListContacs.jsx';
import { useState } from "react";
import ControlBar from './components/ControlBar.jsx';
import BotonAllFavorite from './components/allFavorite.jsx';


export default function App() {

  const [estadoContactos, setContacto] = useState(
    [
      {
        id: 1,
        nombre: "Valeria Ramírez",
        correo: "valeria.ramirez@email.com",
        telefono: "987-654-321",
        favorite: true,
      },
      {
        id: 2,
        nombre: "Daniel Torres",
        correo: "daniel.torres@email.com",
        telefono: "912-345-678",
        favorite: false,
      },
      {
        id: 3,
        nombre: "Sofía Rivas",
        correo: "sofia.rivas@email.com",
        telefono: "955-321-123",
        favorite: true,
      },
      {
        id: 4,
        nombre: "Andrés León",
        correo: "andres.leon@email.com",
        telefono: "944-888-777",
        favorite: false,
      },
      {
        id: 5,
        nombre: "Lucía Fernández",
        correo: "lucia.fernandez@email.com",
        telefono: "933-222-111",
        favorite: true,
      },
      {
        id: 6,
        nombre: "Mateo Castillo",
        correo: "mateo.castillo@email.com",
        telefono: "966-777-333",
        favorite: false,
      }
    ]
  );

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


  return (
    <div className='space-y-2'>
      <Header />
      <main className='space-y-3 min-h-[78vh] '>
        <div className='px-4 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
          <ControlBar onAction={filterContactos} filtroActivo={estadoFiltro} />
          <BotonAllFavorite onAction={todosFavoritos}/>
          </div>
          <p className='text-text-secondary'>{cantidadFavoritos} de {cantidadContactos} contactos son favoritos</p>
        </div>
        <ListContacts contactos={contactosFiltrados} onFavorite={toggleFavorite} />
      </main>
      <Footer />
    </div>
  )
}



