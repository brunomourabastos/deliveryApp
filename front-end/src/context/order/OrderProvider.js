import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import OrderContext from './OrderContext';
// import AppRoute from '../../routes';

function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.map((item) => item.subTotal);
    setTotal(totalPrice.reduce((acc, curr) => acc + curr, 0).toFixed(2));
  }, [cart]);

  const value = useMemo(() => (
    {
      cart,
      setCart,
      total,
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
