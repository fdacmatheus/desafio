import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/partials/Header/Header';
import Footer from './pages/partials/Footer/Footer';
import './App.css';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage'; 
import HomePage from './pages/HomePage';


const App = () => {
 
  // Retorna a estrutura principal da aplicação utilizando o React Router
  return (
    <Router>
      {/* Container principal da aplicação */}
      <div className="App">
        {/* Componente de cabeçalho */}
        <Header />

        {/* Define as rotas da aplicação */}
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<HomePage />} />
          {/* Rota para a página de autores */}
          <Route path="/autores" element={<AuthorsPage />} />
          {/* Rota para a página de livros */}
          <Route path="/livros" element={<BooksPage />} />
        </Routes> 

        {/* Componente de rodapé */}
        <Footer />
      </div>
    </Router>
  );
}

// Exporta o componente principal para ser utilizado em outros arquivos
export default App;