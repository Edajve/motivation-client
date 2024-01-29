import axios from "axios";

const rapidApi = axios.create({
    baseURL: "https://api.api-ninjas.com",
}); 

const ACCESS_KEY = "wE5jbdjGofOCf24orutH64Mow5sZOeDvdopJHDRm";

rapidApi.defaults.headers.common["X-Api-Key"] = ACCESS_KEY;

export default rapidApi;