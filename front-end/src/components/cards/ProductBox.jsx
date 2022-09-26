// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function ProductBox({ products }) {
  // const navigation = useNavigate();

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
    </>
  );
}

ProductBox.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default ProductBox;
