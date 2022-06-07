import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import ErrorBanner from '../../components/ErrorBanner';
import { OrderContext } from '../../contexts/OrderContext';
import { Item, OrderType } from '../../types';
import Options from './Options';
import Products from './Products';

interface Props {
  orderType: OrderType;
}

function Type({ orderType }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const context = useContext(OrderContext);
  const data = context?.[0]
  const updateItemCount = context?.[1]

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: OrderType) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`, { withCredentials: true });
      setItems(response.data)
    } catch (error) {
      setError(true);
    }
  }

  if (error) return <ErrorBanner message="에러가 발생했습니다" />

  if (!data || !updateItemCount) return <div>loading...</div>

  const orderTypeKorean = orderType === 'products' ? '상품' : '옵션';

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>{orderTypeKorean} 총 가격: {data?.totals[orderType]}</p>
      <div style={{
        display: 'flex',
        flexDirection: orderType === 'options' ? 'column' : 'row'}}></div>
      {
        orderType === 'products' && (
        items.map((item) => (
          <Products
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={updateItemCount}
            orderType='products'
          />
        ))
      )}
      {
        orderType === 'options' && (
          items.map(item => (
            <Options
              key={item.name}
              name={item.name}
              updateItemCount={updateItemCount}
              orderType='options'
            />
          ))
        )
      }
    </>
  );
}

export default Type;