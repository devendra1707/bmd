import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "https://bmdpro.onrender.com/bmd/";
// export const BASE_URL = "http://localhost:8081/bmd/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    // console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(config);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// privateAxios.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     console.log(token);
//     if (token) {
//       if (!config.headers.common) {
//         config.headers.common = {}; // Initialize if not already exists
//       }
//       config.headers.common.Authorization = `Bearer ${token}`;
//       console.log(config);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error); // Return the rejection
//   }
// );
