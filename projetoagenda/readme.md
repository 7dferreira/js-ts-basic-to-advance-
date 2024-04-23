# Agenda de contactos

Este é um projeto de agenda simples, onde o utilizador precisa de fazer login, para fazer o CRUD (Create, Read, Update, Delete) dos seus contactos. As contas são separadas e cada utilizador tem acesso apenas aos seus contactos. O projeto foi desenvolvido utilizando Node.js, Express, MongoDB como banco de dados e EJS como engine de visualização, seguindo a arquitetura Model-View-Controller (MVC).

## Pré-requisitos

- Node.js instalado
- MongoDB instalado e em execução

## Instalação


1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

   ```env
   CONNECTIONSTRING=sua_url_de_conexao_mongodb
   ```

   Substitua `sua_url_de_conexao_mongodb` pela URL de conexão com o MongoDB.

3. Inicie o servidor:

   ```bash
   npm start
   npm wp
   ```

   O servidor estará em execução em `http://localhost:3000`.


## Funcionalidades

- **CRUD de Contatos:** Adicionar, visualizar, atualizar e excluir contatos.
- **Sistema de Login:** Autenticação de usuários para acesso às funcionalidades da agenda.