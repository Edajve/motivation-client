import axios from "axios";

const internalAPI = axios.create({
    baseURL: "http://localhost:8080",
}); 

export default internalAPI;