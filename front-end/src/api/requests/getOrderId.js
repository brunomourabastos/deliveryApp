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

const getOrderId = async (id) => api
  .get(`/sales/${id}`, tokenAuth());

export default getOrderId;
