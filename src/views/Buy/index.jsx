import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/acheter.css";
import nails_img_1 from "../../assets/press_on_nails_1.jpg";
import nails_img_2 from "../../assets/press_on_nails_2.jpg";
import nails_img_3 from "../../assets/press_on_nails_3.jpg";
import nails_img_4 from "../../assets/press_on_nails_4.jpg";
import nails_img_5 from "../../assets/press_on_nails_5.jpg";
import nails_img_6 from "../../assets/ongles2.jpeg";
import lips_booster_img from "../../assets/kit_lips_booster.jpg";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

const Product = ({ product }) => {
  const addToCart = async () => {
    try {
      const cartId = document.cookie.split("=")[1]; // Récupère l'identifiant du panier depuis les cookies
  
      const response = await axios.post(
        'http://localhost:4000/api/cart/add',
        {
          cartId: cartId,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        },
        {
          withCredentials: true, // Inclure les cookies dans la requête
        }
      );
      console.log(response.data)
  
      // Reste du code
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'article au panier:', error);
    }
  };
  

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>{product.price} F CFA</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
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
    // ... other products
  ]);

  const [kit_lips_booster] = useState([
    {
      id: 1,
      title: "Kit Lips Booster Creme",
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
    }, 2000);
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
            <div className="title">ACHETER</div>
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
