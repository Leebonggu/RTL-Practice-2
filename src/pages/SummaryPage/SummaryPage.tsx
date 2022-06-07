import React, { useContext, useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { PageStep } from '../../types';

function SummaryPage({ pageStep, setStep }: PageStep) {
  const [checked, setChecked] = useState(false);
  const context = useContext(OrderContext);
  const data = context![0]

  const productArray = Array.from(data.products);
  const proudctList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  let optionsRender = null;
  const hasOptions = data.options.size > 0;
  if (hasOptions) {
    const optionsArray = Array.from(data.options.keys());
    const optionsList = optionsArray.map((key) => (<li key={key}>{key}</li>));

    optionsRender = (
      <>
        <h2>옵션: {data.totals.options}</h2>
        <ul>{optionsList}</ul>
      </>
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStep(2);
  }

  return (
    <>
      {pageStep === 1 && (
        <div>
          <h1>주문 확인</h1>
          <h2>여행 상품: {data.totals.products}</h2>
          <ul>{proudctList}</ul>
          <ul>{optionsRender}</ul>
          <form onSubmit={handleSubmit}>
            <input
              type='checkbox'
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              id='confirm-checkbox'
            />
            <label htmlFor='confirm-checkbox'>주문하려는 것을 확인하셨나요?</label>
            <br />
            <button type='submit' disabled={!checked}>주문 확인</button>
          </form>
        </div>
      )}
    </>
  )
}

export default SummaryPage;
