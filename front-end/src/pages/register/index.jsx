import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  NameInput, EmailInput, PasswordInput, SubmitButton } from '../../components/inputs';
import registerUser from '../../api/requests/registerUser';
import { setStorage } from '../../utils/localStorage';

// the following form will use the useForm custom hook
// formState is an object that contains info about the entire form state.
// isValid will check if data is truth or falsy;
// handleSubmit will receive the form data if form validation is successful.
// https://react-hook-form.com/api/useform

export default function Register() {
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigate();

  const form = useForm({ mode: 'onChange' });
  const { isValid } = form.formState;

  const formSubmit = async (info) => {
    try {
      const { data } = await registerUser(info);
      setStorage('user', data);
      navigation('/customer/products');
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <form onSubmit={ form.handleSubmit(formSubmit) }>
      <NameInput
        dataId="common_register__input-name"
        handleForm={ form }
      />

      <EmailInput
        dataId="common_register__input-email"
        handleForm={ form }
      />

      <PasswordInput
        dataId="common_register__input-password"
        handleForm={ form }
      />

      {/* <button
        disable={ !isValid }
        className="button-green"
        // onClick={ onClick }
        type="submit"
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button> */}

      <SubmitButton
        disable={ !isValid }
        text="CADASTRAR"
        dataId="common_register__button-register"
      />

      <div>
        {
          errorMsg.length > 0
        && <p data-testid="common_register__element-invalid_register">{ errorMsg }</p>
        }
      </div>

    </form>
  );
}
