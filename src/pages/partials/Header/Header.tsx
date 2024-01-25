// Header.tsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () =>{
  return (
    <header>
      <div className='header-container'>
        <img className='logo' src="https://cdn-site.contatoseguro.com.br/assets/img/sitenovo/cs_logo_header.png" alt="Logo Contato Seguro" />
        <h1>Biblioteca da contato seguro</h1>
      </div>
      <div className='nav-container'>
          <nav>
            <Link to="/">Inicío</Link>
            <Link to="/autores">Autores</Link>
            <Link to="/livros">Livros</Link>
          </nav>
      </div>
    </header>
  );
};

export default Header;
