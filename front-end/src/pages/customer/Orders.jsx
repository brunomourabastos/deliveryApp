import React, { useEffect, useState } from 'react';
import CustomerOrderCard from '../../components/cards/CustomerOrderCard';
import getOrderByClient from '../../api/requests/getOrderByClient';
import { getStorage } from '../../utils/localStorage';

const Orders = () => {
  const [allOrdersByClient, setAllOrdersByClient] = useState([]);

  useEffect(() => {
    const fetchOrdersByClient = async () => {
      const { id } = getStorage('user');
      const { data: orders } = await getOrderByClient(id);

      setAllOrdersByClient(orders);
    };

    fetchOrdersByClient();
  }, []);

  return (
    allOrdersByClient.length > 0 && allOrdersByClient.map((order) => (
      <CustomerOrderCard
        key={ order.id }
        orderCode={ order.id }
        statusOrder={ order.status }
        dateOrder={ order.saleDate }
        priceTotal={ order.totalPrice }
      />
    ))
  );
};

export default Orders;
