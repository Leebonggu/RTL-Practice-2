import { createContext, useMemo, useState, useEffect } from 'react';
import { OrderType, UpdateItemCount } from '../types';

type OrderCount = {
  products: Map<string, number>,
  options: Map<string, number>,
}

type Total = {
  products: number;
  options: number;
  total: number;
}

export type ContextDefaultValue = {
  products: Map<string, number>,
  options: Map<string, number>,
  totals: Total,
}


export const OrderContext = createContext<[
  ContextDefaultValue,
  (itemName: string, newItemCount: number, orderType: 'products' | 'options') => void,
  () => void,
  ] | null
  >(null)

const pricePerItem = {
  products: 1000,
  options: 500,
}

function calculateSubtotal(orderType: OrderType , orderCounts: OrderCount) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}


export function OrderContextProvider(props: any) {
  const [orderCounts, setOrderCounts] = useState<OrderCount>({
    products: new Map(),
    options: new Map(),
  })

  const [totals, setTotals] = useState<Total>({
    products: 0,
    options: 0,
    total: 0,
  });

  const resetOrderData = () => {
    setOrderCounts({
      products: new Map(),
      options: new Map(),
    })
  }

  useEffect(() => {
    const productTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productTotal + optionsTotal;
    setTotals({
      products: productTotal,
      options: optionsTotal,
      total: total,
    })
  }, [orderCounts])

  const value = useMemo(() => {
    const updateItemCount:UpdateItemCount = (itemName, newItemCount, orderType) => {
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = newOrderCounts[orderType];
      orderCountsMap.set(itemName, Number(newItemCount));

      setOrderCounts(newOrderCounts)
    }
    return [{ ...orderCounts, totals }, updateItemCount, resetOrderData]
  }, [orderCounts, totals])

  return <OrderContext.Provider value={value} {...props} />
}
