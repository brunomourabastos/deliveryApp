import PropTypes from 'prop-types';

const idTable = 'customer_order_details__element-order-table';

function OrderTable({ order: {
  id,
  productsList,
},
}) {
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
          { productsList.map(({ name, quantity, price, subTotal }, index) => (
            <tr key={ index }>
              <td data-testid={ `${idTable}-item-number-${index}` }>
                {id}
              </td>
              <td data-testid={ `${idTable}-name-${index}` }>
                {name}
              </td>
              <td data-testid={ `${idTable}-quantity-${index}` }>
                {quantity}
              </td>
              <td data-testid={ `${idTable}-unit-price-${index}` }>
                {price}
              </td>
              <td data-testid={ `${idTable}-sub-total-${index}` }>
                {subTotal}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <p data-testid="customer_order_details__element-order-total-price">
        Total: R$:
        {' '}
        {price}
      </p>
    </div>
  );
}

OrderTable.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    productsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.string,
      subTotal: PropTypes.string,
    })),
  }).isRequired,
};

export default OrderTable;
