import axios from 'axios';
import { constants } from './constant';

export function postMessage(params) {
  return axios.post(constants.url, params);
}
