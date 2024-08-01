import { RequestError } from '../middlewares/errorMiddleware'
import { CreateBookDto, UpdateBookDto} from '../types/book'
import Book from '../models/Books'
import { Request, Response, NextFunction} from 'express'

//function for creating new book
export const createBook = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const bookInfo : CreateBookDto = req.body
        const newBook = await Book.create(bookInfo)

        res.status(201).json(newBook)
    }
    catch (error){
        next(new RequestError('Could not create book', 400))
    }
} 

//function for getting all books
export const getBooks = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }
    catch(error){
        next(new RequestError('Could Not Fetch Books',500))
    }
}

//function for getting a specific book
export const getBookById = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const book = await Book.findById(req.params.id)
        if(!book){
            return next(new RequestError('Book Not Found', 404))
        }
        res.status(200).json(book)
    }
    catch(error){
        next(new RequestError('Could Not Fetch Book', 500))
    }
}

//function for updating part or all of a book Info
export const updateBook = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const updatedInfo : UpdateBookDto = req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params, updatedInfo, { new : true})
        if(!updatedBook){
           return next(new RequestError('Book Not Found', 404))
        }
        res.status(200).json(updatedBook)
    }
    catch(error){
        next(new RequestError('Could Not Update Book', 500))
    }
}

//function for deleting a specic book
export const deleteBook = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        if(!book){
            return next(new RequestError('Book Not Found', 404))
        }
        res.status(200).json({ message : 'Book Deleted Successfully'})
    }
    catch(error){
        next(new RequestError('Could Not Delete Book', 500))
    }
}

//function for changing coverImage of Book
export const changeCover = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const book = await Book.findById(req.params.id)
        if(!book){
            return next(new RequestError('Book Not Found', 404))
        }
        if(!req.file){
            return next(new RequestError('Please Upload a File', 400))
        }
        book.coverImage = req.file.path
        await book.save()

        res.status(200).json(book)
    }
    catch(error){
        next(new RequestError('Could Not Change Cover', 500))
    }
}    