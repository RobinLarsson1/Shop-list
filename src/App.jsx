import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import "./App.css";


const ShopList = () => {
  const [items, setItems] = useState([])
  const [value, setValue] = useState([])

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:6282/api/shop');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() !== '') {
      try {
        const response = await fetch('http://localhost:6282/api/shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: value }), // Använd "title" istället för "item"
        });
        const data = await response.json();
        console.log(data.message); // Meddelande från servern
        fetchItems(); // Hämta uppdaterad data
        setValue('');
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:6282/api/shop/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        console.log('Item deleted successfully');
        fetchItems();
      } else {
        console.error('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <section className="main-sect">
    <div className='shop-div'>
      <h1 className='shop-h1'>Inköpslista</h1>
      <form onSubmit={handleSubmit} className='item-form'>
        <input type="text" placeholder='Skriv in vara här' value={value} onChange={(e) => setValue(e.target.value)} className='item-input'/>
        <button type="submit"> Lägg till </button>
      </form>
      <ul className='item-ul'>
        {items.map(item => (
          <li key={item.id} className='item-li'>
            {item.title}
            <AiFillDelete onClick={() => deleteItem(item.id)} className='del'/>
          </li>
        ))}
      </ul>
    </div>
    </section>
  );
};

export default ShopList;
