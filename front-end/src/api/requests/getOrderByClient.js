import api from '..';
import { getStorage } from '../../utils/localStorage';

const tokenAuth = () => {
  const getToken = getStorage('user').token;

  return {
    headers: {
      authorization: getToken,
    },
  };
};

const getOrderByClient = async () => api
  .get('/sales', tokenAuth());

export default getOrderByClient;
