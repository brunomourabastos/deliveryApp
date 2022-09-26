import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getSales from '../../services/getSales';
import Navbar from '../../components/Navbar';

export default function SellerOrders() {
  const [sale, setSale] = useState([]);

  useEffect(() => {
    getSales(setSale);
  }, []);

  const saleEmpty = sale.length === 0;

  const convert = (idNumber) => {
    const empStr = '';
    const str = empStr + idNumber;
    const pad = '0000';
    const numeroPedido = pad.substring(0, pad.length - str.length) + str;

    // https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript

    return numeroPedido;
  };

  return (
    <div>
      <Navbar />
      {saleEmpty ? <h2>Não há vendas</h2> : (
        sale.map((order) => (
          <Link
            key={ order.id }
            data-testid={ `seller_orders__element-order-id-${order.id}` }
            to={ `/seller/orders/${order.id}` }
          >
            <h2>
              {convert(order.id)}
            </h2>

            <p
              data-testid={ `seller_orders__element-delivery-status-${order.id}` }
            >
              { order.status }
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${order.id}` }
            >
              { order.saleDate }
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${order.id}` }
            >
              { order.totalPrice.toFixed(2).replace('.', ',') }
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${order.id}` }
            >
              { order.deliveryAddress }
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
