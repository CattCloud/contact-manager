import Header from './components/Header'
import Footer from './components/Footer'
import ListContacts from './components/ListContact'
import { contactosImportantes, contactosFavoritos, contactosRecientes } from './datos.js';


export default function App() {
  return (
    <div className='space-y-4'>
      <Header />
      <main>
        <div className="px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ListContacts titulo="Importantes" color="red" contactos={contactosImportantes} />
          <ListContacts titulo="Favoritos" color="green" contactos={contactosFavoritos} />
          <ListContacts titulo="Recientes" color="blue" contactos={contactosRecientes} />
        </div>
      </main>
      <Footer />
    </div>
  )
}