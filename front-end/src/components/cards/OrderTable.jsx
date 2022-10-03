import PropTypes from 'prop-types';

const idTable = 'customer_order_details__element-order-table';

function OrderTable({ order }) {
  const productList = order.saleProducts;

  return (
    <div>
      <table>
        <caption>Detalhes do pedido</caption>

        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário </th>
            <th>Sub-total</th>
          </tr>
        </thead>

        <tbody>
          { productList.map(({ name, price, SalesProducts }, index) => (
            <tr key={ index }>
              <td data-testid={ `${idTable}-item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${idTable}-name-${index}` }>
                {name}
              </td>
              <td data-testid={ `${idTable}-quantity-${index}` }>
                {SalesProducts.quantity}
              </td>
              <td data-testid={ `${idTable}-unit-price-${index}` }>
                {price}
              </td>
              <td data-testid={ `${idTable}-sub-total-${index}` }>
                {SalesProducts.quantity * price}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <p data-testid="customer_order_details__element-order-total-price">
        {order.totalPrice.toString().replace('.', ',')}
      </p>
    </div>
  );
}

OrderTable.propTypes = {
  order: PropTypes.shape({
    totalPrice: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.string,
    saleProducts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.string,
      subTotal: PropTypes.string,
    })),
  }).isRequired,
};

export default OrderTable;
