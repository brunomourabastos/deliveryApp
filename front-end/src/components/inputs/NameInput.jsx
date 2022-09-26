import React from 'react';
import PropTypes from 'prop-types';

function NameInput({ dataId, handleForm }) {
  return (
    <label htmlFor="name">

      <div className="name-text">Name</div>
      <input
        id="name"
        type="name"
        className="name-input"
        placeholder="Seu nome"
        data-testid={ dataId }
        { ...handleForm.register('name', { minLength: 12, required: true }) }
      />

    </label>
  );
}

NameInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default NameInput;
