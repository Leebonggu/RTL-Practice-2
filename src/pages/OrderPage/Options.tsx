import React from 'react'
import { OrderType, UpdateItemCount } from '../../types';

interface Props {
  name: string;
  orderType: OrderType
  updateItemCount?: UpdateItemCount
}

function Options({ name, updateItemCount, orderType }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.checked ? 1 : 0;
    updateItemCount && updateItemCount(name, Number(currentValue), orderType);
  };

  return (
    <form>
      <input type='checkbox' id={`${name} option`} onChange={handleChange}/>
      {' '}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  )
}

export default Options