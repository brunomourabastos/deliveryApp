import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/OrderContext';
import QuantityInput from '../inputs/QuantityInput';

const dataTestId = 'customer_products__element-card-price-';
const dataTestIdImg = 'customer_products__img-card-bg-image-';
const dataTestIdDescription = 'customer_products__element-card-title-';

function ProductCard({ id, description, price, img }) {
  const [productId] = useState(id);
  const [productDescription] = useState(description);
  const [productPrice] = useState(+(price));
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0.00);

  const { cart, setCart } = useContext(OrderContext);

  useEffect(() => {
    const productUpdated = {
      productId,
      productDescription,
      productPrice,
      quantity,
      subTotal,
    };

    const cartFiltered = cart.filter((product) => product.product !== productId);
    if (quantity === 0) return setCart(cartFiltered);
    setCart([...cartFiltered, productUpdated]);
  }, [cart, productDescription, productId, productPrice, quantity, setCart, subTotal]);

  useEffect(() => {
    setSubTotal(productPrice * quantity);
  }, [productPrice, quantity]);

  const FOUR = 4;

  const serializeZeros = (str, numberOfZeros) => str.padStart(numberOfZeros, 0);

  return (
    <div
      data-testid={ dataTestId + productId }
      key={ productId }
    >

      <span data-testid={ dataTestId + productId }>
        { `${serializeZeros(productPrice.toString(), FOUR)}` }
      </span>

      <img
        data-testid={ dataTestIdImg + productId }
        src={ img }
        alt={ productDescription }
      />

      <div className="card-info">
        <div
          data-testid={ dataTestIdDescription + productId }
        >
          { productDescription }
        </div>

        <div className="card-input">
          <QuantityInput id={ productId } setCardQuantity={ setQuantity } />
        </div>
      </div>
    </div>
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
