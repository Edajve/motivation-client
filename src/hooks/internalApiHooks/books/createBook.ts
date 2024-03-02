import internalAPI from "../../../services/internalApi-client";
import { getCurrentDateTimeString } from "../createNote";

export interface Author {
    authorName: string;
}

export interface BookRequestPayload {
    title: string;
    author: Author;
    description: string;
    totalChapters: number;
    currentChapter: number;
    totalPages: number;
    currentPage: number;
    rating: number;
    startReadingDate: string;
    endReadingDate: string;
    bookOpinion: string;
    specialNotes: string;
    alreadyRead: boolean;
    isCurrentlyReading: boolean;
}

const createBook = (book: any) => {
    const newBook: BookRequestPayload = {
        "title": book.title,
        "author": { authorName: book.author },
        "description": "",
        "totalChapters": book.totalChapters,
        "currentChapter": 0,
        "totalPages": book.totalPages,
        "currentPage": 0,
        "rating": 0,
        "startReadingDate": getCurrentDateTimeString(),
        "endReadingDate": "0000-01-01T01:00:00",
        "bookOpinion": "",
        "specialNotes": "",
        "alreadyRead": false,
        "isCurrentlyReading": false
    }

    return internalAPI
        .post('/api/v1/book', newBook)
        .then(res => {
            return res
        })
        .catch(err => {
            if (err) {
                return err
            }
        })
}

export default createBook