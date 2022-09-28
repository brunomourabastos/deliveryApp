import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import getAllProducts from '../../api/requests/getAllProducts';
import Orders from './Orders';
import CustomerOrderId from './CustomerOrderId';
import ProductBox from '../../components/cards/ProductBox';
import { getStorage } from '../../utils/localStorage';
import Navbar from '../../components/Navbar';
import Checkout from './Checkout';

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

        <Route
          path="/orders/:id"
          element={ <CustomerOrderId /> }
        />

        <Route
          path="/customer/checkout"
          element={ <Checkout /> }
        />

      </Routes>
    </div>
  );
}

export default Customer;
