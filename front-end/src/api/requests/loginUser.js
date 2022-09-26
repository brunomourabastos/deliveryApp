import api from '..';

const loginUser = async (email, password) => {
  const response = api.post('/users/login', { email, password })
    .then((res) => {
      const result = res.data;
      return result;
    })
    .catch(() => false);
  return response;
};

export default loginUser;
