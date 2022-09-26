import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getOrderId from '../../api/requests/getOrderId';
import OrderTable from '../../components/cards/OrderTable';

function CustomerOrderId() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getById = async () => {
      const { data: sale } = await getOrderId(id);
      setOrder(sale);
    };

    getById();
  }, [id]);

  return (
    <main>
      {order.id && <OrderTable />}
    </main>
  );
}

export default CustomerOrderId;
