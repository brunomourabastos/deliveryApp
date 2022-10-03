import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

const requestSalesSeller = async (endpoint, header, setOrder) => {
  await api.get(endpoint, header)
    .then(({ data }) => setOrder(data));
};

export default requestSalesSeller;
