import {useQuery} from 'react-query';
import {apiQROrderGET, apiQROrderPOST} from '../../helpers/fetch';

export const getUser = async params => {
  return await apiQROrderPOST('/api/auth/login', params);
};


