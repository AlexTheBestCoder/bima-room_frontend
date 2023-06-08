import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MutatingDots } from "react-loader-spinner";
import "./index.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    products.forEach((product) => {
      const productPrice = parseFloat(product.price);
      const productQuantity = parseInt(product.quantity);
      total += productPrice * productQuantity;
    });
    return total;
  }, [products]);

  const updateTotalPrice = useCallback(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
  }, [calculateTotalPrice]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        // Remplacez l'URL de l'API avec votre nouvelle URL pour récupérer les produits du panier sans authentification
        const response = await fetch(
          "https://bima-room-backend-ujzj.onrender.com/api/products/cart"
        );
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
          updateTotalPrice();
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(
          "Erreur lors de la récupération des produits du panier",
          error
        );
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchCartProducts();
  }, [updateTotalPrice]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Remplacez l'URL de l'API avec votre nouvelle URL pour mettre à jour la quantité d'un produit
      const response = await fetch(
        `https://bima-room-backend-ujzj.onrender.com/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, quantity: newQuantity }
              : product
          )
        );
        updateTotalPrice();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(
        "Erreur lors de la mise à jour de la quantité du produit",
        error
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Remplacez l'URL de l'API avec votre nouvelle URL pour supprimer un produit
      const response = await fetch(
        `https://bima-room-backend-ujzj.onrender.com/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Erreur lors de la suppression du produit", error);
    }
  };

  return (
    <>
      
      {isLoading ? (
        <div className="loading-container">
          <MutatingDots
            height={100}
            width={100}
            color="#d39932"
            secondaryColor="#d39932"
            radius={12.5}
            ariaLabel="mutating-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
        <Navbar />
        <div className="cart-container">
          {products.length === 0 ? (
            <p className="empty-cart-message">Aucun produit dans le panier.</p>
          ) : (
            <>
              <ul className="cart-products-list">
                <p className="cart-product-title">Mon Panier</p>
                {products.map((product) => (
                  <li key={product._id} className="cart-product-item">
                    <div className="product-info-container">
                      <div className="product-details">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                        />
                        <div>
                          <p className="product-title">{product.title}</p>
                          <br />
                          <p className="product-price">{product.price} F CFA</p>
                        </div>
                      </div>

                      <div className="product-quantity-container">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                        <p className="product-quantity">{product.quantity}</p>
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.quantity - 1
                            )
                          }
                          disabled={product.quantity === 1}
                        >
                          -
                        </button>
                      </div>
                      <p>{product.totalPrice} F CFA</p>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteProduct(product._id)}
                        style={{ height: "max-content" }}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
                <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.227)" }}></div>
              </ul>
              <p>{totalPrice}</p>
            </>
          )}
        </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Cart;
