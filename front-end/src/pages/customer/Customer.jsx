import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import getAllProducts from '../../api/requests/getAllProducts';
import Orders from './Orders';
import ProductBox from '../../components/cards/ProductBox';
import { getStorage } from '../../utils/localStorage';
import Navbar from '../../components/Navbar';

function Customer() {
  const [user, setUser] = useState('Default User');
  const [products, setProducts] = useState([]);
  const { pathname } = useLocation();

  const productsPath = '/customer/products';

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: allProducts } = await getAllProducts();
      if (pathname === productsPath) setProducts(allProducts);
    };

    fetchProducts();
    setUser(getStorage('user'));
  }, [pathname]);

  return (
    <div>
      <Navbar>{user.name}</Navbar>

      <Routes>
        <Route
          path="/products"
          element={ <ProductBox products={ products } /> }
        />

        <Route
          path="/orders"
          element={ <Orders /> }
        />

      </Routes>
    </div>
  );
}

export default Customer;
