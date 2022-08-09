import axios from "axios";
import { config } from "./config";
import { _logoutuser } from "../functions/authfunctions";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((req: any) => {
  req.headers.authorization = sessionStorage.getItem("token");
  req.headers["ldjaldjal"] = sessionStorage.getItem("role");
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status === 401 || error.response.status === 403) {
    //   _logoutuser();
    // }
    if (error.response.data.message === "Unauthorized") {
      // _logoutuser();
    } else {
      return error;
    }
  }
);

export { axiosInstance };
