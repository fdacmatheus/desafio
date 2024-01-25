import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './pages/partials/Header/Header';
import Footer from './pages/partials/Footer/Footer';
import './App.css';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage'; 
import HomePage from './pages/HomePage';

const App = () => {
 
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/autores" element={<AuthorsPage />} />
        <Route path="/livros" element={<BooksPage />} />
      </Routes> 
      <Footer />
    </div>
    </Router>
  );
  
}

export default App;
