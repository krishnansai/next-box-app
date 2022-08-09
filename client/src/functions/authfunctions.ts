import { axiosInstance as axios } from "../config/axiosInstance";

const _loguser = async (email: string, password: string) => {
  return axios.post("/auth/login", {
    email,
    password,
  });
};

const _registeruser = async (email: string, password: string, name: string) => {
  return axios.post("/auth/register", {
    email,
    password,
    name,
    role: "user",
  });
};

const _logoutuser = async () => {
  window.location.href = "/";
  sessionStorage.clear();
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return axios.get("/auth/logout");
};

export { _loguser, _registeruser, _logoutuser };
