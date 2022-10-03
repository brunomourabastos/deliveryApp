import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import getOrderId from '../../api/requests/getOrderId';
import OrderTable from '../../components/cards/OrderTable';

const DATATESTID37 = 'customer_order_details__element-order-details-label-order-id';
const DATATESTID38 = 'customer_order_details__element-order-details-label-seller-name';
const DATATESTID39 = 'customer_order_details__element-order-details-label-order-date';
const TESTID40 = 'customer_order_details__element-order-details-label-delivery-status';
const TESTID47 = 'customer_order_details__button-delivery-check';
function CustomerOrderId() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getById = async () => {
      const { data: sale } = await getOrderId(id);
      setOrder(sale);
      console.log(sale);
    };

    getById();
  }, [id]);

  return (
    <div>
      {order
        ? (
          <div>
            <p data-testid={ DATATESTID37 }>
              Pedido
              {' '}
              {`${order.id}`}
            </p>
            {order.seller
              ? (
                <p data-testid={ DATATESTID38 }>
                  P.Vend:
                  {' '}
                  {order.seller.name}
                </p>) : <p>Carregando</p>}
            <p data-testid={ DATATESTID39 }>
              {' '}
              { order.saleDate ? format(Date.parse(order.saleDate), 'dd/MM/yyyy') : null}
            </p>
            <p data-testid={ TESTID40 + order.id }>{order.status}</p>
            <button
              data-testid={ TESTID47 }
              type="button"
            >
              Marcar como Entregue

            </button>
            <main>
              {order.id && <OrderTable order={ order } />}
            </main>
          </div>)
        : <p>Carregando</p> }
    </div>

  );
}

export default CustomerOrderId;
