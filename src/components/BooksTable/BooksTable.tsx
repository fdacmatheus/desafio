import React, { useState } from 'react';
import { Book } from '../../models/Book';
import { Author } from '../../models/Author';
import Modal from '../Modal/Modal';
import { TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import './BooksTable.css';

interface BooksTableProps {
  books: Book[];
  authors: Author[];
  onDelete: (bookId: string) => void; 
}

const BooksTable: React.FC<BooksTableProps> = ({ books, authors, onDelete }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAuthorNameById = (authorId: string) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Autor Desconhecido';
  };

  const handleDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
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
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{getAuthorNameById(book.authorId)}</td> 
              <td>{book.pages || 'N/A'}</td>
              <td>
                <EyeOpenIcon className="details-icon" onClick={() => handleDetailsClick(book)} />
                <TrashIcon className="delete-icon" onClick={() => book.id && onDelete(book.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedBook && (
          <div className='container-modal-livro'>
            <h2>Detalhes do Livro</h2>
            <p><strong>Nome:</strong> {selectedBook.name}</p>
            <p><strong>Autor:</strong> {selectedBook.authorId}</p> 
            <p><strong>Páginas:</strong> {selectedBook.pages || 'N/A'}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BooksTable;
