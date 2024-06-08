//create a axios instance

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://vet-app-tyyk.onrender.com/api/v1",
});

export default axiosInstance;