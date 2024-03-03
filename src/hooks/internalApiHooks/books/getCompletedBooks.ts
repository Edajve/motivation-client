import internalAPI from "../../../services/internalApi-client";
import { BookRequestPayload } from "./createBook";

function getCompletedBooks(): Promise<BookRequestPayload[]> {
    return internalAPI
        .get("/api/v1/book/completed")
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default getCompletedBooks