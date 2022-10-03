import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getLocalStorage from '../services/getLocalStorage';

export default function Navbar() {
  const [userStored, setUserStored] = useState({
    userName: '',
    role: '',
    control: 1,
  });

  const navigate = useNavigate();
  // https://reactrouter.com/en/main/hooks/use-navigate

  useEffect(() => {
    const getUser = getLocalStorage('user');
    if (!getUser) {
      console.log('voltou para login');
      return navigate('/login');
    }
    const { name, role } = getUser;
    setUserStored((prevState) => ({ ...prevState, userName: name, role }));
    console.log(`fez o login de ${role}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStored.control]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // criando 3 tipos de Navbar (customer, seller e admin),
  // iremos setar pelo useState qual das 3 Navbars utilizaremos.

  const customerNavbar = (
    <nav>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => navigate('/customer/products') }
      >
        products
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => navigate('/customer/orders') }
      >
        orders
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
        // onClick={ () => navigate('/profile') implementar}
      >
        {userStored.userName}
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        quit
      </button>
    </nav>
  );

  const sellerNavbar = (
    <nav>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => navigate('/seller/orders') }
      >
        PEDIDOS
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {userStored.userName}
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        Sair
      </button>
    </nav>
  );

  const adminNavbar = (
    <nav>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {`${userStored.userName} Admin`}
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        Sair
      </button>
    </nav>
  );

  // se o usuário for cliente, renderiza o navbar de cliente
  if (userStored.role === 'customer') {
    return customerNavbar;
  }

  // se usuário for vendedor, renderiza o navbar de vendedor
  if (userStored.role === 'seller') {
    return sellerNavbar;
  }

  // se usuário for administrador, renderiza o navbar de administrador
  if (userStored.role === 'administrator') {
    return adminNavbar;
  }

  // se não ..Loading..
  return <>...Loading...</>;
}
