import { render, screen } from '../../../test-util';
import userEvent from '@testing-library/user-event';
import { OrderContextProvider } from '../../../contexts/OrderContext';
import Type from '../Type'
import OrderPage from '../OrderPage';

test('update product\'s total when products change', async () => {
  render(<Type orderType='products'/>, { wrapper: OrderContextProvider });

  const productsTotal = screen.getByText('상품 총 가격', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  // America 여행상품 1개 추가
  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America'
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent('1000');
})

test('update options total when option change', async () => {
  render(<Type orderType='options' />)

  const optionsTotal = screen.getByText('옵션 총 가격', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});

describe('total price of goods and options', () => {
  const setStep = jest.fn();
  const orderPageStep = 0

  test('총가격은 0원에서 시작합니다', async () => {

    render(<OrderPage pageStep={orderPageStep} setStep={setStep}/>);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America'
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  })
  test('옵션을 추가하면 총 가격이 바뀝니다', async () => {
    const setStep = jest.fn();
    render(<OrderPage pageStep={0} setStep={setStep}/>);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance'
    });

    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');
  })

  test('옵션을 취소하면 총 가격이 줄어듭니다', async () => {
    render(<OrderPage pageStep={orderPageStep} setStep={setStep}/>);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');


    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America'
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');


    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  })
})