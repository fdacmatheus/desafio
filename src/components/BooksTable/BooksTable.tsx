import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Author } from '../../models/Author'; 
import { Book } from '../../models/Book'; 
import useLocalStorage from '../LocalStorage/useLocalStorage'; 
import './BooksTable.css'
import { TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const BooksList = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [authors] = useLocalStorage<Author[]>('authors', []);
  const [selectedBook, setSelectedBook] = useState<BookWithAuthor | null>(null);

  interface BookWithAuthor extends Book {
    authorName: string;
  }

  const [booksWithAuthors, setBooksWithAuthors] = useState<BookWithAuthor[]>([]);

  useEffect(() => {
    const mergedBooks = books.map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, authorName: author ? author.name : 'Autor desconhecido' };
    });
    setBooksWithAuthors(mergedBooks);
  }, [books, authors]);

  const handleDelete = (bookId: string) => {
    // Filtra para manter apenas os livros que NÃO correspondem ao ID fornecido
    const updatedBooks = books.filter(book => book.id !== bookId);
  
    // Atualiza o estado e o LocalStorage com a nova lista de livros
    setBooks(updatedBooks);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome do Livro</th>
            <th>Autor</th>
            <th>Número de Páginas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {booksWithAuthors.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.authorName}</td>
              <td>{book.pages || 'N/A'}</td>
              <td>
              <EyeOpenIcon className="view-icon" onClick={() => setSelectedBook(book)} />
              <TrashIcon 
              className="delete-icon"  onClick={() => { if (book.id) { handleDelete(book.id); } }} />
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog.Root open={selectedBook !== null} onOpenChange={() => setSelectedBook(null)}>
  <Dialog.Trigger asChild />
  <Dialog.Overlay className="dialog-overlay" />
  <Dialog.Content className="dialog-content">
    <Dialog.Title>Detalhes do Livro</Dialog.Title>
    {selectedBook && (
      <div>
        <p><strong>Nome:</strong> {selectedBook.name}</p>
        <p><strong>Autor:</strong> {selectedBook.authorName}</p>
        <p><strong>Páginas:</strong> {selectedBook.pages || 'N/A'}</p>
      </div>
    )}
    <Dialog.Close asChild>
      <button className="dialog-close">Fechar</button>
    </Dialog.Close>
  </Dialog.Content>
</Dialog.Root>

    </div>
  );
};

export default BooksList;