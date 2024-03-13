import { SubmitBookForm } from "../../../components/bookComponents/SubmitBookReviewButton";
import internalAPI from "../../../services/internalApi-client";

function submitABookByID(id: number, submitFormPayload: SubmitBookForm): Promise<any> {
    return internalAPI
        .put("/api/v1/book/submit/" + id, submitFormPayload)
        .then(res => { return res.data })
        .catch(err => { throw err });
}

export default submitABookByID