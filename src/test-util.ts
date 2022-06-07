import {render, queries, RenderOptions} from '@testing-library/react'
import React from 'react';
import { OrderContextProvider } from './contexts/OrderContext';

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>,) => {
  render(ui, {queries: {...queries }, wrapper: OrderContextProvider, ...options})
}

export * from '@testing-library/react'
export { customRender as render }