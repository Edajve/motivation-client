import { EditPayload } from "../../../components/bookComponents/EditBookButton";
import internalAPI from "../../../services/internalApi-client";

function editBookUsingUpdateForm(id: number, editPayload: EditPayload): Promise<any> {
    return internalAPI
        .put("/api/v1/edit/book/" + id, editPayload)
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default editBookUsingUpdateForm