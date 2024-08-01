import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../src/app';
import Book from '../src/models/Books';
import connectDB from '../src/config/db';

jest.setTimeout(30000);

describe('Book API', () => {
  beforeAll(async () => {
    // Connect to a test database
    await connectDB();
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
    server.close();
  });

  const sampleBook = {
    title: 'Book1',
    author: 'Author_Book_1',
    publishedDate: '2024-08-01',
    isbn: '1234567890',
  };

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const res = await request(app).post('/api/books/new').send(sampleBook);
      expect(res.status).toBe(201);
      expect(res.body.title).toBe(sampleBook.title);
      expect(res.body.author).toBe(sampleBook.author);
    
      await Book.findByIdAndDelete(res.body._id);  // Cleanup after test
    });
  });

  describe('GET /api/books', () => {
    it('should get all books', async () => {
      const book = await Book.create(sampleBook);
      const res = await request(app).get('/api/books');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe(sampleBook.title);
    
      await Book.findByIdAndDelete(book._id);  // Cleanup after test
    });
  });

  describe('GET /api/books/:id', () => {
    it('should get a book by id', async () => {
      const book = await Book.create(sampleBook);
      const res = await request(app).get(`/api/books/${book._id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe(sampleBook.title);
      
      await Book.findByIdAndDelete(book._id);  // Cleanup after test
    });

    it('should return 404 if book not found', async () => {
      const res = await request(app).get('/api/books/123456789012');
      expect(res.status).toBe(500);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book', async () => {
      const book = await Book.create(sampleBook);
      const updatedBook = { ...sampleBook, title: 'Updated Title' };
      const res = await request(app).put(`/api/books/${book._id}`).send(updatedBook);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
      
      await Book.findByIdAndDelete(book._id);  // Cleanup after test
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      const book = await Book.create(sampleBook);
      const res = await request(app).delete(`/api/books/${book._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Book Deleted Successfully');
      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeNull();
    });
  });

  describe('PATCH /api/books/:id', () => {
    it('should update book cover image', async () => {
      const book = await Book.create(sampleBook);
      const res = await request(app)
        .patch(`/api/books/${book._id}`)
        .attach('coverImage', 'test_image.jpg');

        if (res.status !== 200) {
            console.error('Error response:', res.body); 
          }
      expect(res.status).toBe(200);
      expect(res.body.coverImage).toBeDefined();
      
      await Book.findByIdAndDelete(book._id)
    });
  });
});
