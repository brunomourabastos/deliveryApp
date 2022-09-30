import React from 'react';

const DATATESTID29 = 'customer_checkout__select-seller';
const DATATESTID30 = 'customer_checkout__input-address';
const DATATESTID31 = 'customer_checkout__input-address-number';
const DATATESTID32 = 'customer_checkout__button-submit-order';

export default function DeliveryDetails() {
  return (
    <div>
      <span>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select
            id="seller"
            data-testid={ `${DATATESTID29}` }
          >
            {' '}
            API vendedor

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
          />
        </label>
      </span>
      <div>
        <button
          data-testid={ `${DATATESTID32}` }
          type="button"
          onClick={ () => console.log('cliquei no finalizar pedido') }
        >
          Finalizar Pedido

        </button>
      </div>
    </div>
  );
}
