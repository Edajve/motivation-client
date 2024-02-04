import axios from "axios";

const rapidApi = axios.create({
    baseURL: "http://localhost:8080",
}); 

export default rapidApi;