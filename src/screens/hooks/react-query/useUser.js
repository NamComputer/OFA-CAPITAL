import {apiQROrderGET, apiQROrderPOST, apiQROrderRegisterPOST,apiQROrderGETProfile,apiCreateTransPOST} from '../../helpers/fetch';
import { getData } from '../../helpers/asyncStorage';
export const posUserLogin = async params => {
  return await apiQROrderPOST('/api/auth/login', params);
};

export const posUserRegiser = async params => {
  return await apiQROrderRegisterPOST('/api/auth/register?code=SzSkddFPMvb8vXArz6QR3Czw', params);
};

export const getProfile = async params => {
  return await apiQROrderGETProfile('/api/auth/profile', params);
};


//get by limit
// export const getBalance = async params => {
//   return await apiQROrderGET('/api/transactions?pagination[page]=1&filters[user][$eq]='+await(getData('idUser')), params);
// };

export const getBalance = async params => {
  return await apiQROrderGET('/api/transactions?pagination%5Blimit%5D=10', params);
};

export const getTotalBalance = async params => {
  return await apiQROrderGET('/api/transactions/assets', params);
};

export const posPurchase =  async params => {
  return await apiCreateTransPOST('/api/transactions', params,await(getData('loginToken')));
}
