import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import loginContext from '../../context/login/context';
import { setStorage, getStorage } from '../../utils/localStorage';
import loginUser from '../../api/requests/loginUser';

export default function Login() {
  const {
    userEmail, userPass,
    setUserEmail, setUserPass,
    setCustomer, customerStatus, setCustomerStatus,
    sellerStatus, setSellerStatus } = useContext(loginContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigation = useNavigate();

  const form = useForm({ mode: 'onChange' });

  useEffect(() => {
    const validate = () => {
      const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
      const validEmail = re.test(userEmail);
      const NUMBERFIVE = 5;
      if (validEmail && userPass.length > NUMBERFIVE) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    validate();
  }, [userEmail, userPass]);

  useEffect(() => {
    const userData = getStorage('user');

    if (userData?.token && DataTransfer?.role === 'customer') {
      navigation('/customer/products');
    }
  });

  const formSubmit = async () => {
    const data = await loginUser(userEmail, userPass);
    if (!data) setErrorMsg(true);
    setStorage('user', data);
    setCustomer({ ...data });

    if (data.role === 'customer') {
      setCustomerStatus(true);
    }
    if (data.role === 'seller') {
      setSellerStatus(true);
    }
  };

  if (customerStatus) {
    return <Navigate to="/customer/products" />;
  }
  if (sellerStatus) {
    return <Navigate to="/seller/orders" />;
  }

  // async function onClickLogin(event) {
  //   event.preventDefault();
  //   const data = await fetch('http://localhost:3001/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: userEmail, password: userPass }),
  //   });
  //   const response = await data.json();
  // }

  return (
    <form onSubmit={ form.handleSubmit(formSubmit) }>

      <div>
        <input
          data-testid="common_login__input-email"
          type="text"
          placeholder="Digite seu email"
          value={ userEmail }
          name="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
        <input
          data-testid="common_login__input-password"
          type="password"
          name="password"
          value={ userPass }
          placeholder="Digite sua senha"
          onChange={ ({ target }) => setUserPass(target.value) }
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isDisabled }
        >
          Login

        </button>

        <button
          data-testid="common_login__button-register"
          type="button"
          disabled={ false }
          onClick={ () => navigation('/register') }
        >
          Sign up

        </button>
      </div>

      <div>
        { errorMsg.length > 0
          && <p data-testid="common_login__element-invalid-email">{ errorMsg }</p> }
      </div>
    </form>

  );
}
