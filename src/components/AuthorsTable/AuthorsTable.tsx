import React, { useState } from 'react';
import { Author } from '../../models/Author';
import Modal from '../Modal/Modal';
import { TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import './AuthorsTable.css';

interface AuthorsTableProps {
  authors: Author[];
  onDelete: (authorId: string) => void;
}

const AuthorsTable: React.FC<AuthorsTableProps> = ({ authors, onDelete }) => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <TrashIcon className="delete-icon" onClick={() => author.id ? onDelete(author.id) : null} />
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
