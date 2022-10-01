import api from '..';

const getAllSellers = async () => {
  const sellers = api.get('/users/sellers');
  return sellers;
};

export default getAllSellers;
