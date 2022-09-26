import React from 'react';
import PropTypes from 'prop-types';

function PasswordInput({ dataId, handleForm }) {
  return (
    <label htmlFor="password-label">
      <div className="password-text">Senha</div>

      <input
        id="password"
        type="password"
        placeholder="Senha"
        className="password-input"
        data-testid={ dataId }
        { ...handleForm
          .register('password', { minLength: 6, required: true }) }
      />
    </label>
  );
}

PasswordInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default PasswordInput;
