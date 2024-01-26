export interface Book {
  id?: string;       // Identificador único, opcional
  name: string;      // Título do livro, obrigatório
  authorId: string;  // Identificador único do autor associado ao livro, obrigatório
  pages?: number;    // Número de páginas do livro, opcional
}