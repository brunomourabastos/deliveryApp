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
    fetch('http://localhost:3001/users/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: userToken },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.message) {
        case 'User already exists':
          return setErrMsg(data.message);
        default:
          break;
        }
      });
  }

  return (
    <>
      {
        errMsg !== ''
      && <p data-testid="admin_manage__element-invalid-register">{ errMsg }</p>
      }
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ form.handleSubmit(createUser) }>
        <NameInput
          dataId="admin_manage__input-name"
          handleForm={ form }
        />

        <EmailInput
          dataId="admin_manage__input-email"
          handleForm={ form }
        />

        <PasswordInput
          dataId="admin_manage__input-password"
          handleForm={ form }
        />

        <RoleInput
          dataId="admin_manage__select-role"
          handleForm={ form }
        />

        <SubmitButton
          disable={ !isValid }
          text="CADASTRAR"
          dataId="admin_manage__button-register"
        />
      </form>
    </>
  );
}
