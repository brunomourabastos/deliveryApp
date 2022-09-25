import React, { useContext, useState, useEffect } from 'react';
import loginContext from '../../context/login/context';

export default function Login() {
  const { userEmail, userPass, setUserEmail, setUserPass } = useContext(loginContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [notFoundUser, setNotFoundUser] = useState(false);

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

  async function onClickLogin(event) {
    event.preventDefault();
    const data = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPass }),
    });
    const response = await data.json();
    console.log(response);

    if (response.message === 'User not found') {
      setNotFoundUser(true);
    }
  }

  return (
    <form>
      <div>
        {notFoundUser
        && (
          <p
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha incorretos

          </p>)}
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
          onClick={ onClickLogin }
        >
          Login

        </button>
      </div>
    </form>

  );
}
