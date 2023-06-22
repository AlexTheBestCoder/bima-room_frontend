import btn_close from "../../assets/fermer.png";
import btn_delete from "../../assets/supprimer.png";
import axios from "axios";
import { useEffect, useState } from "react";
import {ThreeDots } from "react-loader-spinner";
import ReactModal from "react-modal";
import { useQuery } from "react-query";
const uuid = require("uuid");

export default function Product ({ product }) {

    const [cartItems, setCartItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false); // Ajout de l'état isAddingToCart
    // const [isLoading, setIsLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        setIsCartLoading(true);
        // Récupérer l'identifiant unique du panier depuis le localStorage
        const cartId = localStorage.getItem("cartId");
  
        // Vérifier si l'identifiant du panier est disponible
        if (!cartId) {
          return;
        }
        // Envoyer une requête GET pour récupérer les éléments du panier en utilisant les paramètres
        const response = await axios.get(
          `https://bima-room-backend-ujzj.onrender.com/api/cart/${cartId}`
        );
        console.log(response.data.items);
        // Mettre à jour les éléments du panier dans le state
        const totalSum = response.data.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(totalSum);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des éléments du panier :",
          error
        );
      } finally {
        setIsCartLoading(false);
        setIsLoading(false); // Définir isLoading à false une fois les données récupérées ou en cas d'erreur
      }
    };

    const { data: cartItemsData } = useQuery('cartItems', fetchCartItems, {
      refetchInterval: 1000,
    });
    
    useEffect(() => {
      if (cartItemsData) {
        setCartItems(cartItemsData);
      }
    }, [cartItems, cartItemsData]);

    const addToCart = async (product) => {
      try {
        setIsAddingToCart(true);
        setIsCartLoading(true);
        // Récupérer l'identifiant unique du panier depuis localStorage
        let cartId = localStorage.getItem("cartId");
  
        // Si aucun identifiant de panier n'est trouvé, générer un nouvel identifiant
        if (!cartId) {
          cartId = uuid.v4();
          localStorage.setItem("cartId", cartId);
        }
  
        // Envoyer une requête POST pour ajouter le produit au panier
        await axios.post("https://bima-room-backend-ujzj.onrender.com/api/cart", {
          cartId: cartId, // Utiliser le cartId existant s'il est défini, sinon générer un nouvel identifiant
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        });
        fetchCartItems();
        console.log(cartId);
        // Afficher un message de succès ou effectuer une autre action si nécessaire
        console.log("Produit ajouté au panier avec succès !");
      } catch (error) {
        // Gérer les erreurs en conséquence
        console.error("Erreur lors de l'ajout au panier :", error);
      } finally {
        setModalIsOpen(true);
        setIsAddingToCart(false);
        setIsCartLoading(false);
      }
    };
  
    const handleDeleteItem = async (itemId) => {
      try {
        // setIsCartLoading(false);
        // Récupérer l'identifiant unique du panier depuis localStorage
        const cartId = localStorage.getItem("cartId");
  
        // Envoyer une requête DELETE pour supprimer l'élément du panier
        await axios.delete(`https://bima-room-backend-ujzj.onrender.com/api/cart/${cartId}/${itemId}`);
        fetchCartItems();
  
        // Mettre à jour les éléments du panier dans le state ou effectuer toute autre action nécessaire
        // ...
      } catch (error) {
        // Gérer les erreurs en conséquence
        console.error("Erreur lors de la suppression de l'élément :", error);
      } finally {
        setIsCartLoading(false);
      }
    };
  
    useEffect(() => {
      if (modalIsOpen) {
        document.body.classList.add("disable-scroll");
      } else {
        document.body.classList.remove("disable-scroll");
      }
    }, [modalIsOpen]);
  
    return (
      <>
        <div className="product">
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>{product.price} F CFA</p>
          <button
            onClick={() => {
              addToCart(product);
            }}
            disabled={isAddingToCart || isCartLoading}
          >
            {isAddingToCart || isCartLoading ? (
              <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Ajouter au panier"
            )}
          </button>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={modalIsOpen ? "modal-container open" : "modal-container"}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.752)",
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <div className="modal-header">
            <p>PANIER</p>
            <div
              style={{ width: "2rem", borderBottom: "3px solid gainsboro" }}
            ></div>
            <button onClick={() => setModalIsOpen(false)}>
              <img src={btn_close} alt="btn_close" />
            </button>
          </div>
          <ul className="modal-cart-items">
            {cartItems.map((items) => (
              <li key={items._id}>
                <div className="modal-cart-items-container">
                  <div className="image-container ">
                    <img
                      src={items.image}
                      alt={items.title}
                      className=""
                      
                    />
                  </div>
                  <div className="modal-cart-items-details">
                    <p>{items.title}</p>
                    <div className="modal-cart-items-quantity">
                      <p>{items.quantity}</p>x
                      <p style={{ letterSpacing: "0.1rem" }}>{items.price}F</p>
                    </div>
                  </div>
                </div>
                <button
                  className="modal-cart-items-button"
                  onClick={() => handleDeleteItem(items._id)}
                >
                  <img src={btn_delete} alt="btn_delete" />
                </button>
              </li>
            ))}
          </ul>
  
          <div className="modal-footer">
            {isLoading ? (
              <div className="loader">
                <ThreeDots
                  height="60"
                  width="60"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                Sous-total :
                <p style={{ letterSpacing: "0.1rem" }}>{totalAmount}F</p>
              </p>
            )}
            <button>VOIR LE PANIER</button>
          </div>
        </ReactModal>
      </>
    );
  };

