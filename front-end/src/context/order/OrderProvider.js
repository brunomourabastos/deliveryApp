import { useState, useEffect, useMemo } from 'react';

import OrderContext from './OrderContext';
import AppRoute from '../../routes';

function OrderProvider() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.map((item) => item.subTotal);
    setTotal(totalPrice.reduce((acc, curr) => acc + curr, 0).toFixed(2));
  }, [cart]);

  const Children = useMemo(() => (
    {
      cart,
      setCart,
      total,
    }), [cart, setCart, total]);

  return (
    <OrderContext.Provider value={ Children }>
      <AppRoute />
    </OrderContext.Provider>
  );
}

export default OrderProvider;
