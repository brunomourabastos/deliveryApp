import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import OrderContext from '../../context/order/OrderContext';

function ProductBox({ products }) {
  const navigation = useNavigate();
  const { total } = useContext(OrderContext);

  const serialize = (price) => price.toFixed(2).toString().replace('.', ',');

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={ product.id }
          id={ product.id }
          description={ product.name }
          price={ product.price }
          img={ product.urlImage }
        />
      ))}

      <button
        data-testId="customer_products__button-cart"
        type="button"
        total={ total }
        disabled={ +(total) === 0 }
        onClick={ () => navigation('../checkout', { replace: true }) }
      >
        <span data-testId="customer_products__checkout-bottom-value">
          { serialize(+total) }
        </span>
      </button>
    </>
  );
}

ProductBox.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default ProductBox;
