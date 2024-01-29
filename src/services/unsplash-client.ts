import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
});

const ACCESS_KEY = "W0HsJJX25QXKiI0-ayA5FjRH0giSdSYuUZV_w5Xbx9g";

unsplashApi.defaults.headers.common["Authorization"] = `Client-ID ${ACCESS_KEY}`;

export default unsplashApi;