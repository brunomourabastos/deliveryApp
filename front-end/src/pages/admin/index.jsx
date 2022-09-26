import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  NameInput, EmailInput, PasswordInput, SubmitButton, RoleInput,
} from '../../components/inputs';

export default function Admin() {
  const [errMsg, setErrMsg] = useState('');

  const form = useForm({ mode: 'onChange' });
  const { isValid } = form.formState;

  function createUser(formData) {
    const userToken = localStorage.getItem('token');
    fetch('http://localhost:3001/users/register/admin/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: userToken },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => setErrMsg(err.message));
  }

  return (
    <>
      {
        errMsg.length > 0
      && <p data-testid="admin_manage__element-invalid-register">{ errMsg }</p>
      }
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ form.handleSubmit(createUser) }>
        <NameInput
          dataId="admin_register__input-name"
          handleForm={ form }
        />

        <EmailInput
          dataId="admin_register__input-email"
          handleForm={ form }
        />

        <PasswordInput
          dataId="admin_register__input-password"
          handleForm={ form }
        />

        <RoleInput
          dataId="admin_register__input-role"
          handleForm={ form }
        />

        <SubmitButton
          disable={ !isValid }
          text="CADASTRAR"
          dataId="admin_register__button-register"
        />
      </form>
    </>
  );
}
