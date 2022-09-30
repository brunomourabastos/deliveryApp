import { useEffect, useContext } from 'react';
import DeliveryDetails from '../../components/cards/DeliveryDetails';
import OrderContext from '../../context/order/OrderContext';

function Checkout() {
  const { cart, setCart, total, setTotal } = useContext(OrderContext);

  const tableDataId = 'customer_checkout__element-order-table';
  const removeItem = (itemId) => {
    setCart(cart.filter((product) => product.productId !== +(itemId)));
  };

  const totalPriceOrder = () => {
    const sum = cart.reduce((acc, item) => {
      acc += item.quantity * item.productPrice;
      return acc;
    }, 0);
    setTotal(sum);
    return sum;
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotal(0);
    }
    totalPriceOrder();
  }, [cart]);

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
                  {(product.quantity * product.productPrice)
                    .toFixed(2).toString().replace('.', ',')}
                </td>

                <td>

                  <button
                    data-testid={ `${tableDataId}-remove-${index}` }
                    type="button"
                    value={ product.productId }
                    onClick={ ({ target }) => (removeItem(target.value)) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        Total R$
        <span data-testid="customer_checkout__element-order-total-price">
          {total.toString().replace('.', ',')}
        </span>
      </div>
      <div>
        <DeliveryDetails />
      </div>
    </div>
  );
}

export default Checkout;
