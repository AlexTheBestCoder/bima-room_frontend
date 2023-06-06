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
import kit_lips_booster from "../../assets/kit_lips_booster.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import { MutatingDots } from "react-loader-spinner";

const Product = ({ product, isAuthenticated, userId, token }) => {
  const addToCart = async () => {
    try {
      const response = await axios.post(
        "https://bima-room-backend.onrender.com/api/products",
        {
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      

      if (response.status === 201) {
        console.log("Article ajouté au panier");
      } else {
        throw new Error("Erreur lors de l'ajout de l'article au panier");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article au panier:", error);
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      {isAuthenticated && (
        <button onClick={addToCart}>Ajouter au panier</button>
      )}
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
    {
      id: 2,
      title: "Press On Nails XXL",
      price: 8000,
      image: nails_img_2,
      category: "press_on_nails",
    },
    
    {
      id: 3,
      title: "Press On Nails XXL",
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
      price: 80000,
      image: nails_img_6,
      category: "press_on_nails",
    },
    
  ]);

  const [lips_booster_creme] = useState([
    {
      id: 1,
      title: "Kit Lips Booster Crème",
      price: 10000,
      image: kit_lips_booster,
      category: "lips_booster_creme",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    console.log("Token récupéré des cookies:", storedToken);
    const storedId = Cookies.get("userId");
    console.log("ID utilisateur extrait des cookies:", storedId);

    setToken(storedToken);
    setUserId(storedId);
    if (storedToken && storedId) {
      setIsAuthenticated(true);
    }
  }, []);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userId:", userId);
  console.log("token:", token);

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

  const filteredProductsPressOnNails = lips_booster_creme.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "" || product.category === filterCategory;
    return matchesSearchQuery && matchesCategory;
  });

  const [isLoading, setIsLoading] = useState(true);
  
  setTimeout(() => {
    setIsLoading(false)
  }, 2000)

  return (
    <>
    {isLoading ? (
      <div className="loading-container">
        <MutatingDots
          height="150"
          width="150"
          color="#d39932"
          secondaryColor="#b56020"
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
            <option value="lips_booster_creme">
              <span translate="no">Lips Booster</span> Crème
            </option>
          </select>
        </div>
        <br />
        <div className="product-list">
          {filteredProductsLips.map((product) => (
            <Product
              key={product.id}
              product={product}
              isAuthenticated={isAuthenticated}
              userId={userId}
              token={token}
            />
          ))}
          {filteredProductsPressOnNails.map((product) => (
            <Product
              key={product.id}
              product={product}
              isAuthenticated={isAuthenticated}
              userId={userId}
              token={token}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )}</>);
};

export default ProductList;
