  // setup fetch/axios chung.
  import axios from "axios";


  export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // interceptors : Automatically attach token to requests
  httpClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // or however you store the token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );