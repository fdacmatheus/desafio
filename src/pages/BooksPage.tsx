import React, { useState } from 'react';
import BooksTable from '../components/BooksTable/BooksTable';
import useLocalStorage from '../components/LocalStorage/useLocalStorage';
import Modal from '../components/Modal/Modal';
import BookForm from '../components/BookForm/BookForm';
import { Book } from '../models/Book'; 
import { PlusIcon } from '@radix-ui/react-icons'


const BooksPage = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const handleSaveBook = (book: Book) => {
    setBooks([...books, book]);
    setIsBookModalOpen(false);
  };

  return (
    <div className='container'>
      <div className='container-titulo'>
          <h1>Livros</h1>
          <button className='add-button' onClick={() => setIsBookModalOpen(true)}> <PlusIcon /> Adicionar Livro</button>
      </div>
      <BooksTable />
      <Modal show={isBookModalOpen} onClose={() => setIsBookModalOpen(false)}>
        <BookForm onSave={handleSaveBook} />
      </Modal>

    </div>
  );
};

export default BooksPage;
