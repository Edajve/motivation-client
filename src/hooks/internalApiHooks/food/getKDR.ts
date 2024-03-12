import internalAPI from "../../../services/internalApi-client";

interface KdResponse {
    kd: Number;
}

const getKD = (): Promise<KdResponse> => {
    return internalAPI
        .get('/api/v1/kdr')
        .then(res => { return res.data})
        .catch(err => { if (err) throw new err })
}

export default getKD