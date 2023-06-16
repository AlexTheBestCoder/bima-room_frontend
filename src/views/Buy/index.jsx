import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../styles/acheter.css";
import nails_img_1 from "../../assets/press_on_nails_1.jpg";
import nails_img_2 from "../../assets/press_on_nails_2.jpg";
import nails_img_3 from "../../assets/press_on_nails_3.jpg";
import nails_img_4 from "../../assets/press_on_nails_4.jpg";
import nails_img_5 from "../../assets/press_on_nails_5.jpg";
import nails_img_6 from "../../assets/ongles2.jpeg";
import lips_booster_img from "../../assets/kit_lips_booster.jpg";
import btn_close from "../../assets/fermer.png";
import btn_delete from "../../assets/supprimer.png";
import axios from "axios";
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import ReactModal from "react-modal";
const uuid = require("uuid");

const Product = ({ product }) => {
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
      setCartItems(response.data.items);
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

const ProductList = () => {
  const [press_on_nails] = useState([
    {
      id: 1,
      title: "Press On Nails XXL",
      price: 8000,
      image: nails_img_1,
      category: "press_on_nails",
    },
    {
      id: 2,
      title: "Press On Nails XL",
      price: 8000,
      image: nails_img_2,
      category: "press_on_nails",
    },
    {
      id: 3,
      title: "Press On Nails XL",
      price: 8000,
      image: nails_img_3,
      category: "press_on_nails",
    },
    {
      id: 4,
      title: "Press On Nails XXL",
      price: 8000,
      image: nails_img_4,
      category: "press_on_nails",
    },
    {
      id: 5,
      title: "Press On Nails XXL",
      price: 8000,
      image: nails_img_5,
      category: "press_on_nails",
    },
    {
      id: 6,
      title: "Press On Nails XXL",
      price: 8000,
      image: nails_img_6,
      category: "press_on_nails",
    },
    // ... other press on nails products
  ]);

  const [kit_lips_booster] = useState([
    {
      id: 1,
      title: "Kit Lips Booster",
      price: 10000,
      image: lips_booster_img,
      category: "kit_lips_booster",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredProductsLips = press_on_nails.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "" || product.category === filterCategory;
    return matchesSearchQuery && matchesCategory;
  });

  const filteredProductsPressOnNails = kit_lips_booster.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "" || product.category === filterCategory;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <MutatingDots
            height="100"
            width="100"
            color="#d39932"
            secondaryColor="#d39932"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="buy-container">
            <div className="title">BOUTIQUE</div>
            <br />
            <div className="filters">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Recherche..."
              />
              <select value={filterCategory} onChange={handleCategoryChange}>
                <option value="">Toutes les catégories</option>
                <option value="press_on_nails" translate="no">
                  Press On Nails
                </option>
                <option value="kit_lips_booster">
                  <p>
                    Kit <span translate="no">Lips Booster</span> Crème
                  </p>
                </option>
              </select>
            </div>
            <br />
            <div className="product-list">
              {filteredProductsLips.map((product) => (
                <Product key={product.id} product={product} />
              ))}
              {filteredProductsPressOnNails.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductList;
