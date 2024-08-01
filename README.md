```markdown
# Book API

A simple RESTful API for managing a collection of books. The API allows you to create, read, update, and delete book records, as well as upload cover images for books.

## Project Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Code-Gale/tobams.git
   cd book-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/bookapi
   PORT=3000
   ```

4. Start the MongoDB server (if not already running):

   ```bash
   mongod
   ```

## Running the Application

To start the application, run:

```bash
npm run dev
```

The API will be available at `http://localhost:5050`.

## API Endpoints

### Create a New Book

- **Endpoint:** `POST /api/books/new`
- **Description:** Creates a new book record.
- **Request Body:**

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "publishedDate": "2024-08-01",
    "isbn": "1234567890"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "60c72b2f4f1a2c001c8e4e44",
    "title": "Book Title",
    "author": "Author Name",
    "publishedDate": "2024-08-01",
    "isbn": "1234567890",
    "coverImage": null,
    "createdAt": "2024-08-01T00:00:00.000Z",
    "updatedAt": "2024-08-01T00:00:00.000Z"
  }
  ```

### Get All Books

- **Endpoint:** `GET /api/books`
- **Description:** Retrieves a list of all books.
- **Response:**

  ```json
  [
    {
      "_id": "60c72b2f4f1a2c001c8e4e44",
      "title": "Book Title",
      "author": "Author Name",
      "publishedDate": "2024-08-01",
      "isbn": "1234567890",
      "coverImage": null,
      "createdAt": "2024-08-01T00:00:00.000Z",
      "updatedAt": "2024-08-01T00:00:00.000Z"
    }
  ]
  ```

### Get a Book by ID

- **Endpoint:** `GET /api/books/:id`
- **Description:** Retrieves a single book by its ID.
- **Response:**

  ```json
  {
    "_id": "60c72b2f4f1a2c001c8e4e44",
    "title": "Book Title",
    "author": "Author Name",
    "publishedDate": "2024-08-01",
    "isbn": "1234567890",
    "coverImage": null,
    "createdAt": "2024-08-01T00:00:00.000Z",
    "updatedAt": "2024-08-01T00:00:00.000Z"
  }
  ```

### Update a Book

- **Endpoint:** `PUT /api/books/:id`
- **Description:** Updates a book record.
- **Request Body:**

  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "publishedDate": "2024-08-02",
    "isbn": "0987654321"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "60c72b2f4f1a2c001c8e4e44",
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "publishedDate": "2024-08-02",
    "isbn": "0987654321",
    "coverImage": null,
    "createdAt": "2024-08-01T00:00:00.000Z",
    "updatedAt": "2024-08-01T00:00:00.000Z"
  }
  ```

### Delete a Book

- **Endpoint:** `DELETE /api/books/:id`
- **Description:** Deletes a book record.
- **Response:**

  ```json
  {
    "message": "Book Deleted Successfully"
  }
  ```

### Update Book Cover Image

- **Endpoint:** `PATCH /api/books/:id`
- **Description:** Updates the cover image of a book.
- **Request Body:** (Multipart form-data)

  - `coverImage`: The image file to upload.

- **Response:**

  ```json
  {
    "_id": "60c72b2f4f1a2c001c8e4e44",
    "title": "Book Title",
    "author": "Author Name",
    "publishedDate": "2024-08-01",
    "isbn": "1234567890",
    "coverImage": "uploads/1625151600000-test_image.jpg",
    "createdAt": "2024-08-01T00:00:00.000Z",
    "updatedAt": "2024-08-01T00:00:00.000Z"
  }
  ```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

The tests are written using Jest and Supertest. They cover the basic CRUD operations and file upload functionality.

## Contributing

If you wish to contribute to the project, please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
```