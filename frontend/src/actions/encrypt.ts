import { Md5 } from 'ts-md5';
export const ENCRYPT_WORD = {
  LOCAL: "YltLoveGjy",
  SETP: "TOMCAT",
  TOKEN: "gjyforever",
  USEP: "LAlAlaLa"
};
export type EncryptType = "TOKEN" | "LOCAL" | "SETP" | "USEP";
export const Encrypt = {
  base64: {
    decode: (word: string, type: EncryptType) => {
      const tempWord = atob(word)
      return JSON.parse(tempWord.slice(0, tempWord.length - ENCRYPT_WORD[type].length))
    },
    encode: (value: any, type: EncryptType) => {
      return btoa(JSON.stringify(value) + ENCRYPT_WORD[type]);
    },
  },
  md5: (value: string, type: EncryptType) => {
    return Md5.hashStr(value + ENCRYPT_WORD[type]);
  }
}