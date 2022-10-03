import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const serializeZeros = (str, numberOfZeros) => str.padStart(numberOfZeros, 0);
const DATATESTID34 = 'customer_orders__element-delivery-status-';
const FOUR = 4;

function CustomerOrderCard(order) {
  console.log(order);
  const { orderCode, statusOrder, dateOrder, priceTotal } = order;
  const redirect = useNavigate();

  return (
    <div
      onClick={ () => redirect(`/customer/orders/${orderCode}`) }
      onKeyDown={ () => {} }
      role="button"
      tabIndex={ 0 }
    >

      <div
        data-testid={ `customer_orders__element-order-id-${orderCode}` }
      >
        {`Pedido ${serializeZeros(orderCode.toString(), FOUR)}`}
      </div>
      <div data-testid={ DATATESTID34 + orderCode }>
        {statusOrder}
      </div>
      <div>

        <div
          data-testid={ `customer_orders__element-delivery-status-${orderCode}` }
        >
          {/* <aside /> */}
        </div>

        <div>
          <div
            data-testid={ `customer_orders__element-order-date-${orderCode}` }
          >
            { dateOrder ? format(Date.parse(dateOrder), 'dd/MM/yyyy') : null }
          </div>

          <div
            data-testid={ `customer_orders__element-card-price-${orderCode}` }
          >
            { priceTotal.toString().replace('.', ',') }
          </div>
        </div>

      </div>
    </div>
  );
}
export default CustomerOrderCard;
