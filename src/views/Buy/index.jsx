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
import Product from "./Product";
import { MutatingDots } from "react-loader-spinner";




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
