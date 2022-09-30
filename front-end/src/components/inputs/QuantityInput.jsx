import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function QuantityInput({ id, setCardQuantity }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 0) {
      return 0;
    }
    setQuantity(quantity - 1);
  };

  const setValue = ({ target: { value } }) => {
    if (+value) {
      setQuantity(+value);
    }
  };

  useEffect(() => {
    setCardQuantity(quantity);
  }, [quantity]);

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
        value={ quantity }
        onChange={ (event) => (setValue(event)) }
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
