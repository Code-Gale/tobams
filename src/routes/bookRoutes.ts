import { createBook, getBooks, getBookById, updateBook, deleteBook, changeCover } from "../controllers/bookController";
import { upload } from "../middlewares/fileUploader";
import { Router } from 'express'

const router = Router()

router.post('/books/new', createBook)
router.get('/books', getBooks)
router.get('/books/:id', getBookById)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)
router.patch('/books/:id', upload.single('cover'), changeCover)

export default router;