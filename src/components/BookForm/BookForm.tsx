import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Book } from '../../models/Book'; 
import { Author } from '../../models/Author'; 
import useLocalStorage from '../LocalStorage/useLocalStorage'; 
import './BookForm.css';
interface BookFormProps {
    onSave: (book: Book) => void;
    initialData?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ onSave, initialData = { name: '', authorId: '', pages: 0 } }) => {
    const [authors] = useLocalStorage<Author[]>('authors', []);
    const [books] = useLocalStorage<Book[]>('books', []);
    const [authorOptions, setAuthorOptions] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const options = authors.map(author => (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        ));
        setAuthorOptions(options);
    }, [authors]);

    const generateId = () => {
        const maxId = books.reduce((max, book) => Math.max(max, parseInt(book.id || '0')), 0);
        return (maxId + 1).toString();
    };

    const validate = (values: Book) => {
        const errors: Record<string, string> = {};
        if (!values.name) {
            errors.name = 'Nome é obrigatório';
        }
        if (!values.authorId) {
            errors.authorId = 'Autor é obrigatório';
        }
        if (values.pages != null && values.pages < 0) {
            errors.pages = 'O número de páginas não pode ser negativo';
        }
        return errors;
    };

    return (
        <Formik
            initialValues={initialData}
            validate={validate}
            onSubmit={(values, actions) => {
                const bookToSave = initialData.id ? values : { ...values, id: generateId() };
                onSave(bookToSave);
                actions.setSubmitting(false);
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <h1>Adicione aqui o Livro </h1>
                    <Field type="text" name="name" placeholder="Nome do Livro" />
                    <ErrorMessage name="name" component="div" />

                    <div>
                        <Field as="select" name="authorId" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('authorId', e.target.value)}>
                            <option value="">Selecione um Autor</option>
                            {authorOptions}
                        </Field>
                        <ErrorMessage name="authorId" component="div" />
                    </div>
                    <label className='number-pages' htmlFor="pages">Numero de paginas: </label>
                    <Field type="number" name="pages" placeholder="Número de Páginas" />
                    <ErrorMessage name="pages" component="div" />

                    <button className='button-save' type="submit" disabled={isSubmitting}>
                        Salvar
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
