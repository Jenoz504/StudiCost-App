import * as CryptoJs from "crypto-js";

export const encriptar = (data: string):string => {
  return CryptoJs.AES.encrypt(data, 'HIPOTENUSA').toString();
};

export const desencriptar =<T>(valorEncriptado: string):T | null  => {
  const valorDesencriptado = CryptoJs.AES.decrypt(valorEncriptado, 'HIPOTENUSA').toString();
  if (!valorDesencriptado) {
      return null;
  }
  return JSON.parse(valorDesencriptado) as T;
};
