import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import ContactDetailPage from './pages/ContactDetailPage';

export default function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/contactos" element={<ContactsPage/>} />
          {/*<Route path='/contact/:id' element={<ContactDetailPage/>}></Route>*/}
          <Route path='/contacto/:id' element={<ContactDetailPage/>}></Route>
        </Routes>
  );
}