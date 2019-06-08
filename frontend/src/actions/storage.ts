import { Encrypt, EncryptType } from './encrypt';

export const storage = {
  get: (key: string, encrypt?: EncryptType) => {
    if (window.localStorage) {
      const resultTemp = window.localStorage.getItem(key);
      return resultTemp ? (encrypt ? Encrypt.base64.decode(resultTemp, encrypt) : JSON.parse(resultTemp)) : null;
    }
    return null;
  },
  set: (key: string, value: any, encrypt?: EncryptType) => {
    if (window.localStorage) {
      if (encrypt) {
        window.localStorage.setItem(key, Encrypt.base64.encode(value, encrypt));
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      return true;
    }
    return false;
  }
}