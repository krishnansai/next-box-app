import React from "react";
import { RouteProps } from "react-router-dom";
import { axiosInstance as axios } from "../config/axiosInstance";

interface props {
  Component: React.FC<RouteProps>;
}

const AuthRoute = ({ Component }: props) => {
  axios.get("auth/check").then((res) => res);

  return <Component />;
};

export default AuthRoute;
