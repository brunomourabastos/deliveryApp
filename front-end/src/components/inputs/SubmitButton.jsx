import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ text, onClick, disable, dataId }) {
  return (
    <button
      className="button--light-green"
      onClick={ onClick }
      type="submit"
      disabled={ disable }
      data-testid={ dataId }
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  dataId: PropTypes.string.isRequired,
};

export default SecondaryButton;
