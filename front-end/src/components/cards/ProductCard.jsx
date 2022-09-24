import { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ id, description, price, img }) {
  const [productId] = useState(id);

  return (
    <>
      <div>{productId}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{img}</div>
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
  setTotal: PropTypes.func,
}.isRequired;

export default ProductCard;
