import axios from "axios";

const weatherApi = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: {
    key: 'b003be7ccf2f4d5fa7441516242901',
    q: 'Chicago',
  },
});

export default weatherApi;