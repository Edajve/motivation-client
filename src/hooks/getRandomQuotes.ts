import rapidApi from "../services/rapidapi-client";

interface RapidApiResponse {
    quote: string;
    author: string;
    category: string;
}

const motivationParameters = [
    'alone',
    'attitude',
    'computers',
    'death',
    'experience',
    'failure',
    'fear',
    'god',
    'health',
    'inspirational',
    'intelligence',
    'knowledge',
    'leadership',
    'learning',
    'life',
    'money',
    'success'
]

const randomParameter = (motivationParameters: string[]): string => {
    const randomIndex = Math.floor(Math.random() * motivationParameters.length);
    return motivationParameters[randomIndex];
};

const getQuote = (): Promise<RapidApiResponse[]> => {
    return rapidApi.get("/v1/quotes?category=" + randomParameter(motivationParameters))
        .then((res) => { return res.data })
        .catch((err) => { throw err })
}

export default getQuote