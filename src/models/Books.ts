import mongoose from 'mongoose'
const { Schema, Document } = mongoose

export interface IBook extends Document {
    title: string,
    author: string,
    publishedDate : string,
    isbn : string,
    coverImage? : string
}

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    converImage: {
        type: String
    }
})

export default mongoose.model<IBook>('Book', bookSchema)