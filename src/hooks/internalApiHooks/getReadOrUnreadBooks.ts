import internalAPI from "../../services/internalApi-client";

interface Author {
    id: number;
    authorName: string;
}

interface BookResponse {
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
}

function getReadOrUnreadBooks(onlyReadBooks: boolean): Promise<BookResponse[]> {
    return internalAPI
        .get('/api/v1/book/read', { params: { read: String(onlyReadBooks) } })
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default getReadOrUnreadBooks