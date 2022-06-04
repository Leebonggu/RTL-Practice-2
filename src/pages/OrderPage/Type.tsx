import axios from 'axios';
import { useEffect, useState } from 'react'
import { Item } from '../../types';
import Products from './Products';

interface Props {
  orderType: string;
}


function Type({ orderType }: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {
        orderType === 'products' ? (
        items.map((item) => (
          <Products
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
          />
        ))
      ) : null}
    </>
  );
}

export default Type;