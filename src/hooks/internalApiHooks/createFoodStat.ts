import internalAPI from "../../services/internalApi-client";

export interface createFoodStatPaylod {
    dailyStatus: string
    dateSubmitted: string
}

const createFoodStat = (foodStat: createFoodStatPaylod) => {
    internalAPI
        .post('/api/v1/food',
            {
                dailyStatus: foodStat.dailyStatus,
                dateSubmitted: foodStat.dateSubmitted
            })
}

export default createFoodStat