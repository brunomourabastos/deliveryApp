import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import OrderContext from './OrderContext';
// import AppRoute from '../../routes';

function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const value = useMemo(() => (
    {
      cart,
      setCart,
      total,
      setTotal,
    }), [cart, total]);

  return (
    <OrderContext.Provider value={ value }>
      { children }
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderProvider;
