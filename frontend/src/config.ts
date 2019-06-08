import Axios from 'axios';

export const SERVER_URL = "http://120.79.56.127:3000";
export const ajax = Axios.create({
  baseURL: SERVER_URL,
  timeout: 60000
})