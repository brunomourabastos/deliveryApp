import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import loginContext from './context';

function Provider({ children }) {
  const [userName, setUserName] = useState([]);
  const [userPass, setUserPass] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    token: '',
  });
  const [customerStatus, setCustomerStatus] = useState(false);
  const [sellerStatus, setSellerStatus] = useState(false);

  const value = useMemo(() => (
    {
      userName,
      setUserName,
      userPass,
      setUserPass,
      userEmail,
      setUserEmail,
      customer,
      setCustomer,
      customerStatus,
      setCustomerStatus,
      sellerStatus,
      setSellerStatus,
    }
  ), [customer, customerStatus, sellerStatus, userEmail, userName, userPass]);

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
