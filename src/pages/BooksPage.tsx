import React, { useState, useEffect } from 'react';
import BooksTable from '../components/BooksTable/BooksTable';
import useLocalStorage from '../components/LocalStorage/useLocalStorage';
import Modal from '../components/Modal/Modal';
import BookForm from '../components/BookForm/BookForm';
import { Book } from '../models/Book'; 

const BooksPage = () => {
  const [booksInStorage, setBooksInStorage] = useLocalStorage<Book[]>('books', []);
  const [books, setBooks] = useState<Book[]>([]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    setBooks(booksInStorage);
  }, [booksInStorage]);

  const handleSaveBook = (book: Book) => {
    const newBooks = [...books, book];
    setBooksInStorage(newBooks);
    setIsBookModalOpen(false);
  };

  const handleDeleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooksInStorage(updatedBooks);
  };

  return (
    <div className='container'>
      <div className='container-titulo'>
        <h1>Livros</h1>
        <button className='add-button' onClick={() => setIsBookModalOpen(true)}>Adicionar Livro</button>
      </div>
      <BooksTable books={books} onDelete={handleDeleteBook} />
      <Modal show={isBookModalOpen} onClose={() => setIsBookModalOpen(false)}>
        <BookForm onSave={handleSaveBook} />
      </Modal>
    </div>
  );
};

export default BooksPage;
