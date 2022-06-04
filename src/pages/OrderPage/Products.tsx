import { Item } from '../../types';

function Products({ name, imagePath }: Item) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img 
        style={{ width: '75%' }}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name}-products`}
      />
      <form style={{ marginTop: '10px'}}>
        <label style={{ textAlign: 'right'}}>{name}</label>
        <input
          style={{ marginLeft: 7 }}
          type='number'
          name='quantity'
          min='0'
          defaultValue={0}
        />
      </form>
    </div>
  );
}

export default Products;