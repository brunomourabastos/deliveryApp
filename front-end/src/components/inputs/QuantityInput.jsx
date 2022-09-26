import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function QuantityInput({ id, setCardQuantity }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((acc) => acc + 1);
  };

  const decrement = () => {
    if (quantity > 0) setQuantity((acc) => acc - 1);
  };

  const setValue = ({ target: { value } }) => (
    (value < 0) ? setQuantity(0) : setQuantity(value)
  );

  useEffect(() => {
    setCardQuantity(quantity);
  }, [quantity, setCardQuantity]);

  return (
    <div className="quantity-container">
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        id="decrement"
        type="button"
        onClick={ decrement }
      >
        -
      </button>

      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        id="quantity"
        type="number"
        min={ 0 }
        value={ quantity }
        onChange={ setValue }
      />

      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        id="increment"
        type="button"
        onClick={ increment }
      >
        +
      </button>
    </div>
  );
}

QuantityInput.propTypes = {
  id: PropTypes.string,
  setCardQuantity: PropTypes.func,
}.isRequired;

export default QuantityInput;
