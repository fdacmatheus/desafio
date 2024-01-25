import React, { useState, useEffect } from 'react';
import { Book } from '../../models/Book';
import { Author } from '../../models/Author';
import useLocalStorage from '../LocalStorage/useLocalStorage';
import Modal from '../Modal/Modal';
import './BooksTable.css';
import { TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const BooksList = () => {
    const [books, setBooks] = useLocalStorage<Book[]>('books', []);
    const [authors] = useLocalStorage<Author[]>('authors', []);
    const [selectedBook, setSelectedBook] = useState<BookWithAuthor | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        const updatedBooks = books.filter(book => book.id !== bookId);
        setBooks(updatedBooks);
    };

    const handleDetailsClick = (book: BookWithAuthor) => {
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
                    {booksWithAuthors.map((book) => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.authorName}</td>
                            <td>{book.pages || 'N/A'}</td>
                            <td>
                                <EyeOpenIcon className="view-icon" onClick={() => handleDetailsClick(book)} />
                                <TrashIcon className="delete-icon" onClick={() => book.id ? handleDelete(book.id) : null} 
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
                        <p><strong>Autor:</strong> {selectedBook.authorName}</p>
                        <p><strong>Páginas:</strong> {selectedBook.pages || 'N/A'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BooksList;
