import { render, screen } from '../../../test-util';
import SummaryPage from '../SummaryPage';

test('checkbox and button', () => {
  const setStep = jest.fn();
  
  render(<SummaryPage pageStep={1} setStep={setStep}/>);
  const checkbox = screen.getByRole('checkbox',  {
    name: '주문하려는 것을 확인하셨나요?'
  }) as HTMLInputElement;
  
  expect(checkbox.checked).toEqual(false)

  const confirmButton = screen.getByRole('button', {
    name: '주문 확인',
  }) as HTMLButtonElement;
  expect(confirmButton.disabled).toEqual(true);
})