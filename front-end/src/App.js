import React from 'react';
import './App.css';
import Provider from './context/login/provider';
import OrderProvider from './context/order/OrderProvider';
import AppRoute from './routes';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Provider>
      <OrderProvider>
        <AppRoute />
      </OrderProvider>
    </Provider>
    // <div className="App">
    //   <span className="logo">TRYBE</span>
    //   <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
