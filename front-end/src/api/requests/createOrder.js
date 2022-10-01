const createOrder = async (orderInfos, token) => {
  const request = await fetch('http://localhost:3001/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${token}`,
    },
    mode: 'cors',
    body: JSON.stringify(orderInfos),
  });
  return request;
};

export default createOrder;
