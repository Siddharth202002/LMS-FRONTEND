// import axios from "axios";

// const BASE_URL = "http://localhost:5005/api/v1";
// const axiosInstance = axios.create();
// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;
// export default axiosInstance;

import axios from "axios";

// Get the base API URL from the environment variable.
// Ensure the variable name 'VITE_API_URL' matches what you set in Vercel.
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create();

// Set the baseURL using the environment variable and append your api path
axiosInstance.defaults.baseURL = `${API_URL}/api/v1`;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
