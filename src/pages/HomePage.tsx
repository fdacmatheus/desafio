// HomePage.tsx
import './Pages.css';
import { Link } from 'react-router-dom';

const HomePage = () =>{
  return (
    <div className='container'>
      <h1>Comece por aqui</h1>
      <p>Bem vindo a biblioteca da contato seguro</p>
        <nav className='navegacao-inicio'>
            <Link to="/autores">Autores</Link>
            <Link to="/livros">Livros</Link>
        </nav> 
    </div>
  );
};

export default HomePage;
