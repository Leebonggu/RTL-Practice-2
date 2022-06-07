import { useState } from 'react';
import { OrderContextProvider } from './contexts/OrderContext';
import CompletePage from './pages/CompletePage/CompletePage';
import OrderPage from './pages/OrderPage/OrderPage';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import { Step } from './types';

function App() {
  const [step, setStep] = useState<Step>(0);
  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        <OrderPage pageStep={step} setStep={setStep}/>
        <SummaryPage pageStep={step} setStep={setStep}/>
        <CompletePage pageStep={step} setStep={setStep}/>
      </OrderContextProvider>
    </div>
  );
}

export default App;
