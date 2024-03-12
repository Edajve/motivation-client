import internalAPI from "../../../services/internalApi-client";

export interface DailyStatus {
    id: number;
    dailyStatus: String;
    dateSubmitted: String;
}

interface AllDailyStatuses {
    [x: string]: any;
    statuses: DailyStatus[]
}

const getFoodStats = (): Promise<AllDailyStatuses> => {
    return internalAPI
        .get('/api/v1/food')
        .then(res => { return res.data })
        .catch(err => { if (err) throw new err })
}

export default getFoodStats