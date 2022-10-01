import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import OrderContext from './OrderContext';
// import AppRoute from '../../routes';

function OrderProvider({ children }) {
  const [sellers, setSellers] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [numberAddress, setNumberAddress] = useState('');
  const [sellerId, setSellerId] = useState(0);

  const value = useMemo(() => (
    {
      sellers,
      setSellers,
      sellerId,
      setSellerId,
      deliveryAddress,
      setDeliveryAddress,
      numberAddress,
      setNumberAddress,
      cart,
      setCart,
      total,
      setTotal,
    }), [cart, total, sellers, deliveryAddress, numberAddress, sellerId]);

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
