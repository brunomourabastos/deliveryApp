import { Route, Routes } from 'react-router-dom';
import Orders from './Orders';
import CustomerOrderId from './CustomerOrderId';
import ProductBox from '../../components/cards/ProductBox';
import Navbar from '../../components/Navbar';
import Checkout from './Checkout';

function Customer() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/products"
          element={ <ProductBox /> }
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
