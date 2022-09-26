import api from '..';

const registerUser = async (userInfos) => api.post('/users/register', {
  ...userInfos,
});

export default registerUser;
