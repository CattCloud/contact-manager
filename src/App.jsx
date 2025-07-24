import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/contactos" element={<ContactsPage/>} />
        </Routes>
  );
}