import Axios from 'axios';

export const SERVER_URL = "";
export const ajax = Axios.create({
  baseURL: SERVER_URL,
  timeout: 60000
})