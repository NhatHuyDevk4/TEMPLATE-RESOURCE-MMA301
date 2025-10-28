import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export default {
  axiosInstance,
};