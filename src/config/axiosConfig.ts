import axios from "axios";
import environment from "../environment";

const axiosConfig = axios.create({
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  params: {
    apikey: environment.REACT_API_PUBLIC_KEY,
    hash: environment.HASH,
    ts: environment.TIMESTAMP,
  },
  baseURL: environment.BASE_URL,
});

export const axiosAuth = (token: string) => {
  return axios.create({
    headers: {
      Accept: "application/json, text/plain, */*",
      authorization: `Bearer ${token}`,
    },
    params: {},
    baseURL: `${environment.AUTH_DOANIN}/api/v2`,
  });
};

export default axiosConfig;
