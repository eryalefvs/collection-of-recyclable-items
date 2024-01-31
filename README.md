# Projeto de Coleta de Materiais Recicláveis

Este é um projeto simples desenvolvido para praticar os conhecimentos básicos em Node.js, TypeScript e integração com banco de dados. O objetivo deste projeto é criar um sistema de gerenciamento de locais de coleta de materiais recicláveis.

## Funcionalidades

- **Cadastro de Locais de Coleta**: Permite cadastrar novos locais de coleta de materiais recicláveis, incluindo informações como nome, endereço e tipos de materiais aceitos.

- **Consulta de Locais de Coleta**: Permite consultar os locais de coleta cadastrados, filtrando por diferentes critérios, como tipo de material aceito ou localização.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento JavaScript que permite a construção de aplicações server-side.

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional e outras funcionalidades ao JavaScript.

- **SQLite**: Banco de dados relacional leve que utiliza um arquivo como sua base de dados.

- **Knex.js**: Biblioteca SQL query builder para Node.js, utilizada como ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados SQLite.

## Pré-requisitos

- Node.js e npm instalados na máquina local.
- Conhecimentos básicos em TypeScript e SQL.

## Instalação

1. Clone este repositório:

    ```
    git clone https://github.com/seu-usuario/projeto-coleta-reciclaveis.git
    ```

2. Instale as dependências:

    ```
    npm install
    ```

3. Execute as migrações e as seeds do banco de dados:

    ```
    npm run knex:migrate
    npm run knex:seed
    ```

4. Inicie o servidor:

    ```
    npm run dev
    ```

## Uso

Após iniciar o servidor, você pode acessar a aplicação em `http://localhost:3333`. A partir daí, você poderá cadastrar novos locais de coleta, consultar os locais cadastrados e realizar diversas operações de CRUD (Create, Read, Update, Delete). Para isso, observe os endpoints no código e utilize o postman ou insomnia para enviar as requisições.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) para relatar bugs ou propor novas funcionalidades. Se deseja contribuir diretamente, faça um fork do repositório, faça as alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

