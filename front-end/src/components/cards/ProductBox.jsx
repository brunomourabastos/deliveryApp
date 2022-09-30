import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import OrderContext from '../../context/order/OrderContext';
import getAllProducts from '../../api/requests/getAllProducts';

function ProductBox() {
  const navigation = useNavigate();
  const { cart } = useContext(OrderContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const serialize = (price) => price.toFixed(2).toString().replace('.', ',');

  useEffect(() => {
    let sum = 0;
    const priceByItem = cart.map((element) => element.quantity * element.productPrice);
    priceByItem.forEach((elem) => {
      sum += elem;
    });
    if (priceByItem.length) setTotalPrice(sum);
  }, [cart]);

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
        disabled={ +(totalPrice) === 0 }
        onClick={ () => navigation('../checkout', { replace: true }) }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { serialize(+totalPrice) }
        </span>
      </button>
    </>
  );
}

ProductBox.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default ProductBox;
