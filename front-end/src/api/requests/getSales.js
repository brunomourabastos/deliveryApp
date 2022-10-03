import api from '..';
import { tokenAuth } from './getOrderByClient';

export default function getSales(setSale) {
  const endpoint = '/sales';
  api.get(endpoint, tokenAuth())
    .then(({ data }) => {
      setSale(data);
    })
    .catch((err) => {
      console.log(err.message, 'Error');
      setSale([]);
    });
}
