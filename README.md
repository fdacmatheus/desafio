#Desafio Contato Seguro - Biblioteca Virtual 📚🖥️

Este projeto foi desenvolvido como parte do desafio de front-end proposto pela Contato Seguro. O principal objetivo do projeto é a criação de um sistema de gerenciamento de livros e autores, implementando funcionalidades de CRUD (Create, Read, Update, Delete) com uma interface interativa.

##Funcionalidades 🚀
###Livros

1- Adicionar Livros: Inclusão de novos livros através de um formulário modal.
2- Listagem de Livros: Visualização de todos os livros registrados em uma tabela.
3- Detalhes do Livro: Exibição de informações detalhadas de cada livro em um modal.
4- Exclusão de Livros: Remoção de livros com alerta de confirmação.

###Autores

1- Adicionar Autores: Cadastro de novos autores por meio de um formulário modal.
2- Listagem de Autores: Apresentação de todos os autores em uma tabela.
3- Detalhes do Autor: Visualização de informações detalhadas de cada autor em um modal.
4- Exclusão de Autores: Remoção de autores com alerta de confirmação.

##Tecnologias Utilizadas 💻

1- React: Biblioteca JavaScript para construção da interface de usuário.
2- React Router Dom: Gerenciamento de rotas na aplicação.
3- Radix UI: Componentes de interface de usuário.
4- Formik: Gerenciamento de formulários.
5- Local Storage: Armazenamento de dados no navegador.
6- TypeScript: Superset de JavaScript para adicionar tipagem e melhorar a qualidade do código.

Estrutura do Projeto 🏗️

/src
  /components: Componentes reutilizáveis.
    BooksTable: Tabela de listagem de livros.
    AuthorsTable: Tabela de listagem de autores.
    Modal: Componente modal para formulários.
    BookForm: Formulário para adicionar/editar livros.
    AuthorForm: Formulário para adicionar/editar autores.
  /models: Modelos de dados para livros e autores.
  /pages: Páginas da aplicação.
    HomePage: Página inicial com navegação.
    BooksPage: Página de gerenciamento de livros.
    AuthorsPage: Página de gerenciamento de autores.
  /partials: Componentes parciais como cabeçalho e rodapé.
App.tsx: Componente principal da aplicação.
index.tsx: Ponto de entrada do React.

Instalação e Execução 🚀
Clone o repositório:

bash
Copy code
git clone https://github.com/fdacmatheus/desafio

Instale as dependências:

bash
Copy code
npm install
Inicie o servidor de desenvolvimento:

bash
Copy code
npm start
Acesse http://localhost:3000 no navegador.# desafio
# desafio
