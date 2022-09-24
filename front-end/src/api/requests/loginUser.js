import api from '..';

const loginUser = async (info) => api.post('/users/login', {
  ...info,
});

export default loginUser;
