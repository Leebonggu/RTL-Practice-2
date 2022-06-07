import { render, screen } from '../../../test-util';
import CompletePage from '../CompletePage';

test('페이지 렌더가 잘 되어야 합니다', async () => {
  const setStep = jest.fn();

  render(<CompletePage pageStep={2} setStep={setStep}/>);

  const page = await screen.findByText('주문이 성공했습니다.');
  expect(page).toHaveTextContent('주문이 성공했습니다.');
});

