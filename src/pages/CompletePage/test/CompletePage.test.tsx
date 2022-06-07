import { render, screen } from '../../../test-util';
import CompletePage from '../CompletePage';

test('페이지 렌더가 잘 되어야 합니다', () => {
  render(<CompletePage />);

  const page = screen.getByText('CompletePage');
  expect(page).toHaveTextContent('CompletePage')
});

