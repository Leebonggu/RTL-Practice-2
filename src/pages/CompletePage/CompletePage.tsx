import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import ErrorBanner from '../../components/ErrorBanner';
import { ContextDefaultValue, OrderContext } from '../../contexts/OrderContext';
import { PageStep } from '../../types';

function CompletePage({ pageStep, setStep }: PageStep) {
  const context = useContext(OrderContext);
  const data = context![0]
  const reset = context![2]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderHistory, setOrderHistroy] = useState([]);
  useEffect(() => {
    orderCompleted(data);
  }, [data]);

  const orderCompleted = async (data: ContextDefaultValue) => {
    try {
      const response = await axios.post('http://localhost:4000/order', data);
      setOrderHistroy(response.data);
      setLoading(false);
      setError(false);
    } catch(error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleClick = useCallback(() => {
    reset();
    setStep(0);
  }, [reset, setStep]);

  if (error) return <>{pageStep === 2 && <ErrorBanner message='에러가 발생했습니다.' />}</>

  if (loading) return <>{pageStep === 2 && <div data-testid='complete-loading'>loading</div>}</>

  let orderTable = orderHistory.map((item: {orderNumber: number; orderPrice: number;}) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.orderPrice}</td>
    </tr>
  ))

  return (
    <>
      {pageStep === 2 && (
        <div style={{ textAlign: 'center' }}>
          <h2>주문이 성공했습니다.</h2>
          <h3>지금까지 모든 주문</h3>
          <br/>
          <table style={{ margin: 'auto' }}>
            <tbody>
              <tr>
                <th>주문 번호</th>
                <th>주문 가격</th>
              </tr>
              {orderTable}
            </tbody>
          </table>
          <button onClick={handleClick}>첫페이지로</button>
        </div>
      )}
    </>
  );
}

export default CompletePage;
