import { useContext } from 'react';
import OrderContext from '../../context/order/OrderContext';

function Checkout() {
  const { cart, setCart, total } = useContext(OrderContext);

  const tableDataId = 'customer_checkout__element-order-table';

  const removeItem = () => {
    setCart(cart.filter((product) => product.productId !== item));
  };

  return (
    <div>
      <table>
        <caption>Finalizar pedido</caption>

        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>
              Remover Item
            </th>
          </tr>
        </thead>

        <tbody>
          {
            cart.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${tableDataId}-item-number-${index}` }
                >
                  {index + 1}
                </td>

                <td
                  data-testid={ `${tableDataId}-table-name-${index}` }
                >
                  {product.productDescription}
                </td>

                <td
                  data-testid={ `${tableDataId}-quantity-${index}` }
                >
                  {product.quantity}
                </td>

                <td
                  data-testid={ `${tableDataId}-unit-price-${index}` }
                >
                  {product.productPrice}
                </td>

                <td
                  data-testid={ `${tableDataId}-sub-total-${index}` }
                >
                  {product.subTotal}
                </td>

                <td>

                  <button
                    data-testid={ `${tableDataId}-remove-${index}` }
                    type="button"
                    onClick={ removeItem }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <span data-testid="customer_checkout__element-order-total-price">
        {+(total)}
      </span>
    </div>
  );
}

export default Checkout;
