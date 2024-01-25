import React, { useState } from 'react';
import { Author } from '../../models/Author';
import useLocalStorage from '../LocalStorage/useLocalStorage';
import Modal from '../Modal/Modal';
import { TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import './AuthorsTable.css';


const AuthorsTable = () => {
  const [authors, setAuthors] = useLocalStorage<Author[]>('authors', []);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (authorId: string) => {
    const updatedAuthors = authors.filter(author => author.id !== authorId);
    setAuthors(updatedAuthors);
  };

  const handleDetailsClick = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome do Autor</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.email || 'N/A'}</td>
              <td>
                <EyeOpenIcon className="details-icon" onClick={() => handleDetailsClick(author)} />
                {author.id && (
                  <TrashIcon className="delete-icon" onClick={() => author.id ? handleDelete(author.id) : null} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedAuthor && (
          <div className='container-modal-autor'>
            <h2 >Detalhes do Autor</h2>
            <p><strong>Nome:</strong> {selectedAuthor.name}</p>
            <p><strong>Email:</strong> {selectedAuthor.email}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuthorsTable;