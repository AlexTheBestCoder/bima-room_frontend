import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartId = document.cookie.split("=")[1];
        console.log(cartId) // Récupère l'identifiant du panier depuis les cookies
        const response = await axios.get(`http://localhost:4000/api/cart?cartId=${cartId}`);
        setCartItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits du panier:', error);
      }
    };    

    fetchCartItems();
  }, []);

  return (
    <div className="cart">
      <h2>Panier</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          <p>{item.price} F CFA</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
