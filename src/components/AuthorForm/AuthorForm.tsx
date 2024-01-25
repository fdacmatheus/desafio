import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Author } from '../../models/Author';
import useLocalStorage from '../LocalStorage/useLocalStorage';
import './AuthorForm.css';

interface AuthorFormProps {
  onSave: (author: Author) => void;
  initialData?: Author;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ onSave, initialData = { name: '', email: '' } }) => {
  const [authors] = useLocalStorage<Author[]>('authors', []);

  const generateId = () => {
    const maxId = authors.reduce((max, author) => Math.max(max, parseInt(author.id || '0')), 0);
    return (maxId + 1).toString();
  };

  const validate = (values: Author) => {
    const errors: Record<string, string> = {};
    if (!values.name) {
      errors.name = 'Nome é obrigatório';
    }
    if (!values.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialData}
      validate={validate}
      onSubmit={(values, actions) => {
        const authorToSave = initialData.id ? values : { ...values, id: generateId() };
        onSave(authorToSave);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Adicione aqui o autor </h1>
          <Field type="text" name="name" placeholder="Nome do Autor" />
          <ErrorMessage name="name" component="div" />

          <Field type="email" name="email" placeholder="Email do Autor" />
          <ErrorMessage name="email" component="div" />

          <button className='button-save' type="submit" disabled={isSubmitting}>
            Salvar
          </button> 
        </Form>
      )}
    </Formik>
  );
};

export default AuthorForm;
