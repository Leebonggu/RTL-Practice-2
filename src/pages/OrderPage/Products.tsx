/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { Item } from '../../types';

function Products({ name, imagePath, updateItemCount, orderType }: Item) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    updateItemCount && updateItemCount(name, Number(currentValue), orderType);
  }
  
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        data-testid='product-img'
        style={{ width: '75%' }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />
      <form style={{ marginTop: '10px'}}>
        <label htmlFor={name} style={{ textAlign: 'right'}}>{name}</label>
        <input
          id={name}
          style={{ marginLeft: 7 }}
          type='number'
          name='quantity'
          min='0'
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Products;