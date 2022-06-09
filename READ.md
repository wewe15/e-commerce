## API Endpoints

#### Login

- POST "api/users/login" Send username and password to get an authentication token.

#### Register

- POST "api/register" () Create a new user by sending its username & email & fristname & lastname & password & phone & address & city.

#### Categories

- Get "api/categories" (Required Authorization Header (admin only)) git list of all categories.
- Get "api/categories/:id" (Required Authorization Header (admin only)) git specific categories by id.
- POST "api/categories" (Required Authorization Header (admin only)) Create a new categories by sending its name.
- DELETE "api/categories/:id" (Required Authorization Header (admin only)) Remove a specific categories by id.

#### Products

- Get "api/products" (Required Authorization Header) git list of all products.
- Get "api/products/:id" (Required Authorization Header) git specific product by id.
- POST "api/products" (Required Authorization Header (admin only)) Create a new product by sending its name & category_id & description & quantity & price and images (multipart/form-data).
- DELETE "api/products/:id" (Required Authorization Header (admin only)) Remove a specific product by id.
- POST "api/products/:id/reviews" (Required Authorization Header (users only)) Create a new reviews and rating for product by sending its name & comment & user_id & rating.

#### Users

- GET "api/users" (Required Authorization Header (now for user only)) git list of all the users.
- Get "api/users/:id" (Required Authorization Header (now for user only)) git specific product by id.
- POST "api/users" (Required Authorization Header (admin only)) Create a new user by sending its username & email & role (user or admin) & fristname & lastname & password & phone & address & city.
- DELETE "api/users/:id" (Required Authorization Header (admin only)) Remove a specific user by id.

<!-- Not implement yet--->
<!-- #### Orders

- Get "/orders" (Required Authorization Header) git list of all orders.
- Get "/orders/:id" (Required Authorization Header) git specific order by id.
- POST "/orders" (Required Authorization Header) Create a new order by sending its status and user_id for the order.
- DELETE "/orders/:id" (Required Authorization Header) Remove a specific order by id.
- POST "/orders/:id/products" (Required Authorization Header) add product to order by sending its product_id and quantity. -->

## Database Schema

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR,
email VARCHAR,
role ENUM(user, admin) => default = user
firstname VARCHAR,
lastname VARCHAR,
password VARCHAR,
phone VARCHAR,
address VARCHAR,
city VARCHAR
);

CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name VARCHAR,
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
category_id REFERENECS categories(id)
name VARCHAR,
description VARCHAR,
price DECIMAL,
quantity INT
);

CREAT TABLE images (
id SERIAL PRIMARY KEY,
path VARCHAR,
product_id REFERENCES products(id)
)

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
status BOOLEAN,
amount INT,
user_id bigint REFERENCES users(id),
order_name VARCHAR,
order_address VARCHAR,
order_phone VARCHAR,
order_city VARCHAR
);

CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
quantity INT,
price DECIMAL,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
);

## Data Shapes

### Category

- id
- name

#### Product

- id SERIAL
- category_id
- name
- description
- price
- quantity

#### User

- id SERIAL
- username
- email
- role
- firstname
- lastname
- password
- phone
- address
- city

#### Orders

- id SERIAL PRIMARY KEY,
- status
- amount
- user_id
- order_name
- order_address
- order_phone
- order_city

### Order_products

- id
- product_id
- order_id
- quantity
- price
