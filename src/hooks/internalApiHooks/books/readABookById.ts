import internalAPI from "../../../services/internalApi-client";

function readBookById(bookId: string | number | undefined) {
    return internalAPI
        .put("/api/v1/book/read/" + bookId)
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default readBookById