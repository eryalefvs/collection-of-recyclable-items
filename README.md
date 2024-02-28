# Collection of Recyclable Items Project

This is a simple project developed to practice basic knowledge in Node.js, TypeScript, and database integration. The goal of this project is to create a management system for recyclable materials collection points.

## Features

- **Collection Point Registration**: Allows registering new recyclable materials collection points, including information such as name, address, and accepted materials types.

- **Collection Points Query**: Allows querying registered collection points, filtering by different criteria, such as accepted material type or location.

## Technologies Used

- **Node.js**: JavaScript development platform that allows building server-side applications.
  
- **TypeScript**: JavaScript superset that adds optional static typing and other features to JavaScript.
  
- **SQLite**: Lightweight relational database that uses a file as its database.
  
- **Knex.js**: SQL query builder library for Node.js, used as an Object-Relational Mapping (ORM) to facilitate interaction with the SQLite database.
  
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties. Used for authentication in the project.

## Prerequisites

- Node.js and npm installed on the local machine.
- Basic knowledge of TypeScript and SQL.

## Installation

1. Clone this repository:

    ```
    git clone https://github.com/eryalefvs/collection-of-recyclable-items.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Run database migrations and seeds:

    ```
    npm run knex:migrate
    npm run knex:seed
    ```

4. Start the server:

    ```
    npm run dev
    ```

## Usage

After starting the server, you can access the application at `http://localhost:3333`. From there, you can log in, register new collection points, query registered points, and perform various CRUD (Create, Read, Update, Delete) operations. To do this, observe the endpoints in the code and use Postman or Insomnia to send requests.

## Contribution

Contributions are welcome! Feel free to open issues to report bugs or propose new features. If you wish to contribute directly, fork the repository, make the changes, and submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
