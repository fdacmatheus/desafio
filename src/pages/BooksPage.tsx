import React, { useState, useEffect } from 'react';
import BooksTable from '../components/BooksTable/BooksTable';
import useLocalStorage from '../components/LocalStorage/useLocalStorage';
import Modal from '../components/Modal/Modal';
import BookForm from '../components/BookForm/BookForm';
import { Book } from '../models/Book';
import { Author } from '../models/Author';  

const BooksPage = () => {
  const [booksInStorage, setBooksInStorage] = useLocalStorage<Book[]>('books', []); // Pegando livros do localStorage
  const [authors, ] = useLocalStorage<Author[]>('authors', []); // Pegando autores do local Storage
  const [books, setBooks] = useState<Book[]>([]); // useState dos livros para reatividade
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); // useState para os modais 

  useEffect(() => { 
    setBooks(booksInStorage);
  }, [booksInStorage]);

  const handleSaveBook = (book: Book) => { 
    const newBooks = [...books, book];
    setBooksInStorage(newBooks);
    setIsBookModalOpen(false);
  };
 
  const handleDeleteBook = (bookId: string) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir este livro?");
    if (isConfirmed) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooksInStorage(updatedBooks); 
    }
  };

  return (
    <div className='container'>
      <div className='container-titulo'>
        <h1>Livros</h1>
        <button className='add-button' onClick={() => setIsBookModalOpen(true)}>Adicionar Livro</button>
      </div>
      <BooksTable books={books} authors={authors} onDelete={handleDeleteBook} />
      <Modal show={isBookModalOpen} onClose={() => setIsBookModalOpen(false)}>
        <BookForm onSave={handleSaveBook} />
      </Modal>
    </div>
  );
};

export default BooksPage;
