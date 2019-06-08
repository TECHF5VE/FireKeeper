import { MD5 } from 'crypto-js';
import { Logger } from '@nestjs/common';

export const APP_ID = '5cfb56fe';
export const API_KEY = 'f3374bbf302b9afef99e81df372659b7';

export const KE_API = 'http://ltpapi.xfyun.cn/v1/ke';
export const SA_API = 'http://ltpapi.xfyun.cn/v1/sa';

export const genReqHeader = () => {
  const utc = Math.round(Date.now() / 1000);
  const param = 'eyJ0eXBlIjoiZGVwZW5kZW50In0=';
  const res =  {
    'X-Appid': APP_ID,
    'X-CurTime': utc.toString(),
    'X-Param': param,
    'X-CheckSum': MD5(API_KEY + utc + param).toString(),
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  Logger.log(res);
  return res;
};
