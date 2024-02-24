import internalAPI from "../../services/internalApi-client";

const createEmotion = (emotion: String) => {
    return internalAPI
        .post('/api/v1/emotion',
            {
                "emotion": emotion
            })
        .then(res => {
            return res
        })
        .catch(err => {
            if (err) {
                return err
            }
        })
}

export default createEmotion