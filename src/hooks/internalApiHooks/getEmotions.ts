import internalAPI from "../../services/internalApi-client";

interface Emotion {
    id: number;
    emotion: string;
}

interface EmotionsResponse {
    data: any;
    emotions: Emotion[];
}


const getEmotions = (): Promise<EmotionsResponse> => {
    return internalAPI
        .get('/api/v1/emotion')
}

export default getEmotions