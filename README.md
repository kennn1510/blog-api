# Blog API

## Description

This is a blog app built to learn about RESTful APIs. It provides the backend functionality for a blog application,
allowing admins (with extra permissions) to create, read, update, and delete blog posts. In addition, users (with lower
permissions) will only be able to read blog posts and create and view other comments. Users will not be able to create
their own blog posts because this is only meant as a personal blog for the admin (this project is limited in scope and
will not be a full-blown social media app).

## Technologies Used

* **Backend:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Templating Engine:** EJS
* **Authentication:** Passport.js, JWT
* **Other Libraries:** dotenv, express-validator

## Setup Instructions

1. **Prerequisites:**
    * Node.js (version 22 or higher)
    * NPM (comes with Node.js)
    * PostgreSQL

2. **Installation:**
    * Clone the repository: `git clone https://github.com/kennn1510/blog-api.git`
    * Navigate to the project directory: `cd blog-api`
    * Install dependencies: `npm install`

3. **Environment Variables:**
    * Create a `.env` file in the root directory of the project.
    * Add the following environment variables, replacing the bracketed placeholders with your actual values:
        ```env
        DATABASE_URL=[Your Database Connection URL, e.g., postgres://username:password@host:port/database_name]
        PORT=[The port your server will run on, e.g., 3000]
        JWT_SECRET=[A secret key for JSON Web Tokens, e.g., my-secret-key]
        ```

4. **Database Setup:**
    * Make sure to create a new database in psql using the same database_name at the end of your DATABASE_URL in the
      .env file.
        ```bash
        psql # Connect to PostgreSQL terminal
        CREATE DATABASE <database_name>; # Should return CREATE DATABASE
        \l # Check that the database was successfully created
        \q # Exit
        ```

    * Set up the database schema with Prisma:
        ```bash
        npx prisma generate
        npx prisma migrate dev
        ```

5. **Running the API:**
    * Start the server: `npm run dev` for a development build or `npm start` for a production build.
    * The API should now be running at `http://localhost:[Your Chosen Port]` (should be the port specified in your
      `.env` file).

## API Endpoints

Here's a list of the main API endpoints:

* **Posts:**
    * `GET /posts`: Get all **published** blog posts (for public users).
    * `GET /posts/:postid`: Get a specific blog post by ID (for public users if published, for admins regardless).
    * `POST /posts`: Create a new blog post (**Admin only** - requires authentication).
        * **Request Body:** JSON object containing `title`, `content`, `published` (boolean), etc.
    * `PUT /api/posts/:id`: Update an existing blog post by ID (**Admin only** - requires authentication).
        * **Request Body:** JSON object containing the fields to update (e.g., `title`, `content`, `published`).
    * `DELETE /api/posts/:id`: Delete a blog post by ID (**Admin only** - requires authentication).
    * `PATCH /api/posts/:id/publish`: Publish a blog post by ID (**Admin only** - requires authentication).
    * `PATCH /api/posts/:id/unpublish`: Unpublish a blog post by ID (**Admin only** - requires authentication).

## Authentication

* Users need to register and log in to obtain a JWT (JSON Web Token).
* This token is typically included in the `Authorization` header of subsequent requests that require authentication (
  e.g., creating, updating, or deleting posts). The token is usually sent as a Bearer token:
  `Authorization: Bearer <your_jwt>`.
* You can test authorization easily using Postman. Just include in the Headers of the request a Key:Value pair, e.g.,
  `Authorization: Bearer <your_jwt>`.

## Potential Future Enhancements

* Implement user roles and permissions.
* Add pagination for retrieving a large number of posts.
* Implement search functionality for posts.
* Allow users to add comments to posts.
* Implement data validation and error handling more robustly.
* Add unit and integration tests.
* Deploy the API to a production environment.

## Contributing

This project was created as part of The Odin Project curriculum and is not currently accepting external contributions.

## License

This project is licensed under the [MIT License](./LICENSE).