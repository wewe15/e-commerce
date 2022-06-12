# e-commerce API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

---

## Prerequisites

You need the following modules and dependencies installed to run this project:

- node # To run the application
- npm # For dependency management

---

## Demo Website

- 👉 Heroku : [https://backende-commerc.herokuapp.com/api/products](https://backende-commerc.herokuapp.com/api/products)

---

## Installing locally on your system

Simply, run the following command to install the project dependencies:

```
$ npm install
```

---

## Setup environment

First, create a .env file with all the required environment variables:

```
- DB_PASSWORD=""
- DB_USERNAME=""
- DB_DATABASE=""
- DB_HOST=""
- SALT_ROUNDS=""
- JWT_SECRET=""
- secret_key="" =>from you'r account in stripe to apply payment
```

---

## Next, start the Postgres

create database:

```
$ create database "name_db";
```

Next, you need to run the database migrations:

```
$ npm run migrate
```

Now, database run on port 5432.

---

## Running the application

Use the following command to run the application in using node:

```
$ npm run start
```

---

The application will run on http://localhost:3001/api.

---

## **Built With**

- [**Node.js**](https://nodejs.org/en/about/)
- - [Sequelize](https://www.npmjs.com/package/sequelize)
- - [Express.js](https://www.npmjs.com/package/express)
- [**Visual Studio Code**](https://code.visualstudio.com/)

---
