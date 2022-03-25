import axios from "axios";
// import { getAccessToken } from 'utils/auth.util';
import environment from "../environment";

const axiosConfig = axios.create({
  headers: {
    Accept: "application/json, text/plain, */*"
  },
  params: {
    apikey: environment.REACT_API_PUBLIC_KEY,
    hash: environment.HASH,
    ts: environment.TIMESTAMP,
  },
  baseURL: environment.BASE_URL,
}); 

export default axiosConfig;
