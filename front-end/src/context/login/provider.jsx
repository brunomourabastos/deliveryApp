import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import loginContext from './context';

function Provider({ children }) {
  const [userName, setUserName] = useState([]);
  const [userPass, setUserPass] = useState([]);
  const [userEmail, setUserEmail] = useState([]);

  const value = useMemo(() => (
    {
      userName,
      setUserName,
      userPass,
      setUserPass,
      userEmail,
      setUserEmail,
    }
  ), [userEmail, userName, userPass]);

  return (
    <loginContext.Provider value={ value }>
      { children }
    </loginContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Provider;
