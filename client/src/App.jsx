import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editorials from './pages/Editorials';
import Runway from './pages/Runway';
import Culture from './pages/Culture';
import Admin from './pages/Admin';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css'


function App() {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editorials' element={<Editorials />} />
        <Route path='/runway' element={<Runway />} />
        <Route path='/culture' element={<Culture />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/editorials/:id' element={<ArticleDetail />} />
        <Route path='/runway/:id' element={<ArticleDetail />} />
        <Route path='/culture/:id' element={<ArticleDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;