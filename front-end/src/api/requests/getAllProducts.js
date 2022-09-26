import api from '..';

const getAllProducts = async () => api.get('/products');

export default getAllProducts;
