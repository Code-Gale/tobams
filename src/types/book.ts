export interface CreateBookDto {
    title: string;
    author: string;
    publishedDate: string;
    isbn: string;
    coverImage: string;
  }
  
export interface UpdateBookDto {
    title?: string;
    author?: string;
    publishedDate?: string;
    isbn?: string;
    coverImage?: string;
  }