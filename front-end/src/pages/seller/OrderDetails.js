import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../../components/Navbar';
import TableSellerOrder from '../../components/Tables/TableSellerOrder';
import updateOrder from '../../api/requests/updateOrder';
import requestSalesSeller from '../../api/requests/requestSallersSeller';

export default function SellerOrderDetails() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const testId = 'seller_order_details__element-order-details-label-delivery-status';

  const headers = { headers: {
    Authorization: token,
  } };

  useEffect(() => {
    async function fetchData() {
      await requestSalesSeller(`/sales/${id}`, headers, setOrder);
    }
    fetchData();
    console.log(order);
  }, []);

  const getOrderReady = () => {
    updateOrder(`/sales/${id}`, { status: 'Preparando' }, headers);
    const cloneOrder = order;
    setOrder({ ...cloneOrder, status: 'Preparando' });
  };

  const dispatchOrder = () => {
    updateOrder(`/sales/${id}`, { status: 'Em Trânsito' }, headers);
    const cloneOrder = order;
    setOrder({ ...cloneOrder, status: 'Em Trânsito' });
  };

  return (
    <div>
      <Navbar />
      <h1>Detalhes do Pedido</h1>
      <div>
        <div>
          <span data-testid="seller_order_details__element-order-details-label-order-id">
            PEDIDO
            {`${order.id}`}
          </span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            Data
            { order.saleDate ? format(Date.parse(order.saleDate), 'dd/MM/yyyy') : null }
          </span>
          <span
            data-testid={ testId }
          >
            {order.status}
          </span>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            onClick={ getOrderReady }
            disabled={ !(order.status === 'Pendente' || order.status === undefined) }
          >
            PREPARAR PEDIDO
          </button>
          <button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            onClick={ dispatchOrder }
            disabled={ !(order.status === 'Preparando' || order.status === undefined) }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total']
                .map((elem, index) => (
                  <th key={ index }>{elem}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            { order?.saleProducts?.map((prod, index) => (
              <TableSellerOrder
                key={ prod.name }
                id={ index }
                name={ prod.name }
                quantity={ prod.SalesProducts.quantity }
                price={ (prod.price)/* .replace('.', ',') */ }
                subtotal={
                  (prod.price * prod.SalesProducts.quantity)
                    .toFixed(2)
                    .replace('.', ',')
                }
                rmButton={ false }
              />)) }
          </tbody>
        </table>
        <div data-testid="seller_order_details__element-order-total-price">
          {
            order.totalPrice && (order.totalPrice).replace('.', ',')
          }
        </div>
      </div>

    </div>
  );
}
