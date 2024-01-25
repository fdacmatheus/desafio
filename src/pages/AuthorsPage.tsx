import React, { useState } from 'react';
import AuthorsTable from '../components/AuthorsTable/AuthorsTable';
import useLocalStorage from '../components/LocalStorage/useLocalStorage';
import Modal from '../components/Modal/Modal';
import AuthorForm from '../components/AuthorForm/AuthorForm';
import { Author } from '../models/Author'; 
import { PlusIcon } from '@radix-ui/react-icons'


const AuthorsPage = () => {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [authors, setAuthors] = useLocalStorage<Author[]>('authors', []);
  const handleSaveAuthor = (author: Author) => {
    setAuthors([...authors, author]);
    setIsAuthorModalOpen(false);
  };
  return (
    <div className='container'>
       <div className='container-titulo'>
        <h1>Autores</h1>
        <button className='add-button' onClick={() => setIsAuthorModalOpen(true)}> <PlusIcon />Adicionar Autor</button>
      </div>
      
      <AuthorsTable />

      <Modal show={isAuthorModalOpen} onClose={() => setIsAuthorModalOpen(false)}>
        <AuthorForm onSave={handleSaveAuthor} />
      </Modal>

      {/* Outros elementos relacionados a autores */}
    </div>
  );
};

export default AuthorsPage;
