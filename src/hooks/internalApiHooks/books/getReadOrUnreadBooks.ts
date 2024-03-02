import internalAPI from "../../../services/internalApi-client";

export interface Author {
    id: number;
    authorName: string;
}

export interface BookResponsePayload {
    id: number;
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
    isCurrentlyReading: boolean
}

function getReadOrUnreadBooks(onlyReadBooks: boolean): Promise<BookResponsePayload[]> {
    return internalAPI
        .get('/api/v1/book/filter', { params: { read: String(onlyReadBooks) } })
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default getReadOrUnreadBooks