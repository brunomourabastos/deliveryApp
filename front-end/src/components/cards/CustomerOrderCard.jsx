import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const serializeZeros = (str, numberOfZeros) => str.padStart(numberOfZeros, 0);

const serializeDate = (date) => {
  const [day, month, year] = date.split('/');

  if (month.length === 1) {
    const formattedMonth = `0${month}`;
    return `${day}/${formattedMonth}/${year}`;
  }

  return date;
};

const FOUR = 4;

function CustomerOrderCard({ orderCode, dateOrder, priceTotal }) {
  const redirect = useNavigate();

  return (
    <div
      onClick={ () => redirect(`${orderCode}`) }
      onKeyDown={ () => {} }
      role="button"
      tabIndex={ 0 }
    >

      <div
        data-testid={ `customer_orders__element-order-id-${orderCode}` }
      >
        {`Pedido ${serializeZeros(orderCode.toString(), FOUR)}`}
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
            { serializeDate(dateOrder) }
          </div>

          <div
            data-testid={ `customer_orders__element-card-price-${orderCode}` }
          >
            R$
            {' '}
            { priceTotal }
          </div>
        </div>

      </div>
    </div>
  );
}

CustomerOrderCard.propTypes = {
  orderCode: PropTypes.number.isRequired,
  dateOrder: PropTypes.string.isRequired,
  priceTotal: PropTypes.string.isRequired,
};

export default CustomerOrderCard;