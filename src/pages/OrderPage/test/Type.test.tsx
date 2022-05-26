import { screen, render } from '@testing-library/react';
import Type from '../Type';

test('display products images form server', async () => {
  render(<Type orderType='products' />);

  const productImages = await screen.findAllByRole('img', {
    name: /product$/i
  }) as HTMLImageElement[];
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(['America', 'England']);
})