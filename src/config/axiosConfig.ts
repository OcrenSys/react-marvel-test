import axios from "axios";
// import { getAccessToken } from 'utils/auth.util';
import environment from "../environment";

const axiosConfig = axios.create({
  headers: {
    Accept: "application/json, text/plain, */*"
  },
  params: {
    ts: environment.TIMESTAMP,
    apikey: environment.REACT_API_PUBLIC_KEY,
    hash: environment.HASH
  },
}); 

export default axiosConfig;
