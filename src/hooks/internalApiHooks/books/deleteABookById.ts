import internalAPI from "../../../services/internalApi-client";


function deleteBookById(id: String | undefined): Promise<any> {
    return internalAPI
        .delete("/api/v1/book/" + id)
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default deleteBookById