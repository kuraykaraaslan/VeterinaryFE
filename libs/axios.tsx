//create a axios instance

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://46.101.128.193:8080/api/v1",
});

export default axiosInstance;