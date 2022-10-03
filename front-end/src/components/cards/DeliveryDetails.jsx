import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllSellers from '../../api/requests/getAllSellers';
import OrderContext from '../../context/order/OrderContext';
import createOrder from '../../api/requests/createOrder';

const DATATESTID29 = 'customer_checkout__select-seller';
const DATATESTID30 = 'customer_checkout__input-address';
const DATATESTID31 = 'customer_checkout__input-address-number';
const DATATESTID32 = 'customer_checkout__button-submit-order';

export default function DeliveryDetails() {
  const { sellers, setSellers } = useContext(OrderContext);
  const { sellerId, setSellerId } = useContext(OrderContext);
  const { deliveryAddress, setDeliveryAddress } = useContext(OrderContext);
  const { numberAddress, setNumberAddress } = useContext(OrderContext);
  const { cart, total } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const USERTOKEN = JSON.parse(localStorage.getItem('user')).token;

  useEffect(() => {
    setLoading(true);
    const getSellers = async () => {
      const allSellers = await getAllSellers();
      setSellers(allSellers.data);
      setSellerId(allSellers.data[0].id);
    };
    // setUserToken(getStorage('token').toString());
    getSellers();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSale = async () => {
    const totalOrder = {
      sellerId,
      products: cart,
      deliveryAddress,
      deliveryNumber: numberAddress,
      total,
    };
    const createdOrder = await createOrder(totalOrder, USERTOKEN);
    const myData = await createdOrder.json();
    navigateTo(`/customer/orders/${myData.id}`);
  };

  return (
    <div>
      <span>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select
            onChange={ (event) => setSellerId(event.target.value) }
            id="seller"
            data-testid={ `${DATATESTID29}` }
            value={ sellerId }
          >
            {loading ? null : sellers.map((element, index) => (
              <option
                key={ index }
                value={ element.id }
              >
                {element.id}
                -
                {element.name}
              </option>
            ))}

          </select>
        </label>
      </span>
      <span>
        <label htmlFor="adress">
          Endereço
          <input
            id="adress"
            data-testid={ `${DATATESTID30}` }
            type="text"
            placeholder="Rua, Avenida, Viela"
            onChange={ (event) => {
              setDeliveryAddress(event.target.value);
            } }
          />
        </label>
      </span>
      <span>
        <label htmlFor="addressNumber">
          Número
          <input
            id="addressNumber"
            data-testid={ `${DATATESTID31}` }
            type="text"
            placeholder="Número"
            onChange={ (event) => {
              setNumberAddress(event.target.value);
            } }
          />
        </label>
      </span>
      <div>
        <button
          data-testid={ `${DATATESTID32}` }
          type="button"
          onClick={ createSale }
        >
          Finalizar Pedido

        </button>
      </div>
    </div>
  );
}
