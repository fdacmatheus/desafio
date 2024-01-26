import React, { useState } from 'react';
import AuthorsTable from '../components/AuthorsTable/AuthorsTable';
import useLocalStorage from '../components/LocalStorage/useLocalStorage';
import Modal from '../components/Modal/Modal';
import AuthorForm from '../components/AuthorForm/AuthorForm';
import { Author } from '../models/Author'; 

const AuthorsPage = () => {
  const [authors, setAuthors] = useLocalStorage<Author[]>('authors', []);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const handleSaveAuthor = (author: Author) => {
    setAuthors([...authors, author]);
    setIsAuthorModalOpen(false);
  };

  const handleDeleteAuthor = (authorId: string) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir este Autor?");
    if(isConfirmed) {
      setAuthors(authors.filter(author => author.id !== authorId));
    }
  };

  return (
    <div className='container'>
      <div className='container-titulo'>
        <h1>Autores</h1>
        <button className='add-button' onClick={() => setIsAuthorModalOpen(true)}>Adicionar Autor</button>
      </div>
      <AuthorsTable authors={authors} onDelete={handleDeleteAuthor} />
      <Modal show={isAuthorModalOpen} onClose={() => setIsAuthorModalOpen(false)}>
        <AuthorForm onSave={handleSaveAuthor} />
      </Modal>
    </div>
  );
};

export default AuthorsPage;
