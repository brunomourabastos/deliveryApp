import React from 'react';
import PropTypes from 'prop-types';

const regexPattern = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function EmailInput({ dataId, handleForm }) {
  return (
    <label htmlFor="email">
      <div className="email-text">Email</div>

      <input
        id="email"
        type="text"
        placeholder="Email"
        className="email-input"
        data-testid={ dataId }
        { ...handleForm
          .register('email', { pattern: regexPattern, required: true }) }
      />
    </label>
  );
}

EmailInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default EmailInput;
