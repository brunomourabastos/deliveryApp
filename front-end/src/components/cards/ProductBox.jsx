import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import OrderContext from '../../context/order/OrderContext';
import getAllProducts from '../../api/requests/getAllProducts';

function ProductBox() {
  const navigation = useNavigate();
  const { total } = useContext(OrderContext);
  const [products, setProducts] = useState([]);

  const serialize = (price) => price.toFixed(2).toString().replace('.', ',');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: allProducts } = await getAllProducts();
      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

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
        data-testid="customer_products__button-cart"
        type="button"
        total={ total }
        disabled={ +(total) === 0 }
        onClick={ () => navigation('../checkout', { replace: true }) }
      >
        <span data-testid="customer_products__checkout-bottom-value">
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
