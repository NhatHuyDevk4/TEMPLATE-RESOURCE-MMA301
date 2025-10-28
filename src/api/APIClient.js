import axios from "axios";

export default class ApiClient {
  constructor() {
    const BASEURL = process.env.EXPO_PUBLIC_BASEURL;
    this.axiosInstance = axios.create({
      baseURL: BASEURL,

      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
