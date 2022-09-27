import React from 'react';
import PropTypes from 'prop-types';

export default function RoleInput({ dataId, handleForm }) {
  return (
    <label htmlFor="role">
      <div className="role-text">Tipo</div>
      <select
        id="role"
        type="role"
        data-testid={ dataId }
        { ...handleForm.register('role', { required: true }) }
      >
        <option value="customer">Cliente</option>
        <option value="seller">Vendedor</option>
        <option value="administrator">Administrador</option>
      </select>
    </label>
  );
}

RoleInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;
