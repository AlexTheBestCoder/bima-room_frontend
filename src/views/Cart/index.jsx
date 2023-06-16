import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Récupérer l'identifiant unique du panier depuis le localStorage
        const cartId = localStorage.getItem("cartId");
        // Vérifier si l'identifiant du panier est disponible
        if (!cartId) {
          setIsLoading(false);
          return;
        }
        // Envoyer une requête GET pour récupérer les éléments du panier en utilisant les paramètres
        const response = await axios.get(`https://bima-room-backend-ujzj.onrender.com/api/cart/${cartId}`);
        console.log(response.data.items)
        // Mettre à jour les éléments du panier dans le state
        setCartItems(response.data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des éléments du panier :", error);
        setIsLoading(false);
      }
    };
    

    fetchCartItems();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div>
      <h2>Mon Panier</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <h4>{item.title}</h4>
            <p>Prix : {item.price} F CFA</p>
            <p>Quantité : {item.quantity}</p>
            <img src={item.image} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
