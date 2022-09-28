import api from '../api';

export default getSales = (setSale) => {
  const endpoint = '/sale';
  api.get(endpoint)
    .then(({ data }) => {
      setSale(data);
    })
    .catch((err) => {
      console.log(err.message, 'Error');
      setSale([]);
    });
};
