import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app'; 
import Book from '../src/models/Books';

describe('Book API', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb+srv://codewhiz001:<password>@tobams.yq2t1zy.mongodb.net/?retryWrites=false&w=majority&appName=tobams');
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Book.deleteMany({});
  });

  const sampleBook = {
    title: 'Book1',
    author: 'Author_Book_1',
    publishedDate: '2024-08-01',
    isbn: '1234567890'
  };

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send(sampleBook);
      
      expect(res.status).toBe(201);
      expect(res.body.title).toBe(sampleBook.title);
      expect(res.body.author).toBe(sampleBook.author);
    });
  });

  describe('GET /api/books', () => {
    it('should get all books', async () => {
      await Book.create(sampleBook);

      const res = await request(app).get('/api/books');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe(sampleBook.title);
    });
  });

  describe('GET /books/:id', () => {
    it('should get a book by id', async () => {
      const book = await Book.create(sampleBook);

      const res = await request(app).get(`/api/books/${book._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.title).toBe(sampleBook.title);
    });

    it('should return 404 if book not found', async () => {
      const res = await request(app).get('/api/books/123456789012');
      
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book', async () => {
      const book = await Book.create(sampleBook);
      const updatedBook = { ...sampleBook, title: 'Updated Title' };

      const res = await request(app)
        .put(`/api/books/${book._id}`)
        .send(updatedBook);
      
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      const book = await Book.create(sampleBook);

      const res = await request(app).delete(`/api/books/${book._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Book deleted successfully');

      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeNull();
    });
  });

  describe('PATCH /api/books/cover-image/:id', () => {
    it('should update book cover image', async () => {
      const book = await Book.create(sampleBook);

      const res = await request(app)
        .patch(`/api/books/cover-image/${book._id}`)
        .attach('coverImage', 'test_image.jpg');
      
      expect(res.status).toBe(200);
      expect(res.body.coverImage).toBeDefined();
    });
  });
});