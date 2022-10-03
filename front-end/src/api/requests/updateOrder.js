import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

const updateOrder = async (endpoint, body, header) => {
  await api.put(endpoint, body, header)
    .then(({ data }) => data);
};

export default updateOrder;
