import { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import Type from './Type';

function OrderPage() {
  const context = useContext(OrderContext);
  const data = context?.[0]
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType='products' />
      </div>
      <div style={{ display: 'flex', marginTop: '20px'}}>
        <div style={{ width: '50%'}}>
          <Type orderType='options' />
        </div>
        <div>
          <h2>Total Price: {data?.totals.total}</h2><br />
          <button>주문</button>
        </div>
      </div>
    </div>
  )
}

export default OrderPage;
