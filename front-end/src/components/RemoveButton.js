import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { MainContext } from '../context/login/context';

export default function RemoveBtn({ id, index }) {
  const { productsCart, setProductsCart } = useContext(MainContext);

  const handleClick = () => {
    const updateCart = productsCart.filter((product) => product.id !== id && product);
    setProductsCart(updateCart);
  };

  return (
    <button
      data-testid={
        `customer_checkout__element-order-table-remove-${index}`
      }
      type="button"
      onClick={ handleClick }
    >
      X
    </button>
  );
}

RemoveBtn.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
