import {useQuery} from 'react-query';
import {apiQROrderGET, apiQROrderPOST, apiQROrderRegisterPOST} from '../../helpers/fetch';

export const posUserLogin = async params => {
  return await apiQROrderPOST('/api/auth/login', params);
};

export const posUserRegiser = async params => {
  return await apiQROrderRegisterPOST('/api/auth/register?code=SzSkddFPMvb8vXArz6QR3Czw', params);
};

export const getUser = async params => {
  return await apiQROrderGET('/api/auth/profile', params);
};
