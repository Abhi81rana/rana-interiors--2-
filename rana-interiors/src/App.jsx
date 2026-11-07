import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Home from './pages/Home.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main key={location.pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designs/:slug" element={<CategoryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
