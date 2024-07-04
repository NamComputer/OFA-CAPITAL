import {useQuery} from 'react-query';
import {apiQROrderGET, apiQROrderPOST} from '../../helpers/fetch';

export const posUser = async params => {
  return await apiQROrderPOST('/api/auth/login', params);
};


export const getUser = async params => {
  return await apiQROrderGET('/api/auth/profile', params);
};
