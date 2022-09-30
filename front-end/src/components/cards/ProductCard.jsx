import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/OrderContext';
import QuantityInput from '../inputs/QuantityInput';

const dataTestId = 'customer_products__element-card-price-';
// const dataTestIdImg = 'customer_products__img-card-bg-image-';
const dataTestIdDescription = 'customer_products__element-card-title-';

function ProductCard({ id, description, price, img }) {
  const [productId] = useState(id);
  const [productDescription] = useState(description);
  const [productPrice] = useState(+(price));
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(quantity * productPrice);
  console.log(`quantidade ${quantity}`);
  console.log(`preço total${subTotal}`);
  const { cart, setCart } = useContext(OrderContext);

  useEffect(() => {
    const productUpdated = {
      productId,
      productDescription,
      productPrice,
      quantity,
      subTotal,
    };

    let productsArray = [...cart];
    productsArray.forEach((product, index) => {
      if (product.productId === productUpdated.productId) {
        productsArray[index] = productUpdated;
      }
    });
    const cartProducts = productsArray.some((product) => productId === product.productId);
    if (quantity > 0 && !cartProducts) {
      productsArray = [...cart, productUpdated];
    }
    setCart(productsArray);
  }, [quantity]);

  useEffect(() => {
    setSubTotal(productPrice * quantity);
  }, [productPrice, quantity]);

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);
  // const FOUR = 4;
  // const serializeZeros = (str, numberOfZeros) => str.padStart(numberOfZeros, 0);

  return (
    <div
      key={ productId }
    >

      <span data-testid={ dataTestId + productId }>
        { `${price.replace('.', ',')}` }
      </span>

      <img
        width={ 50 }
        data-testid={ `customer_products__img-card-bg-image-${productId}` }
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
