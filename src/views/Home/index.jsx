import Navbar from "../../components/Navbar";
import React, { useState } from "react";
// import Slider from "react-slick";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MutatingDots, Puff, Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ongles_img_1 from "../../assets/ongles1.jpg";
import ongles_img_2 from "../../assets/ongles2.jpeg";
import kit_lips_booster from "../../assets/kit_lips_booster.jpg";
import "../../styles/home.css";
import Footer from "../../components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const products = [
    {
      name: "Press On Nails xl",
      price: 5000,
      image: ongles_img_1,
      isBestSeller: true,
      isQuickPreviewAvailable: true,
    },

    {
      name: "KIT LIPS BOOSTER CREME",
      price: 10000,
      image: kit_lips_booster,
      isBestSeller: true,
      isQuickPreviewAvailable: true,
    },
    {
      name: "Press On Nails xxl",
      price: 8000,
      image: ongles_img_2,
      isBestSeller: true,
      isQuickPreviewAvailable: true,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <Puff
            height="250"
            width="250"
            color="#d39932"
            radius={1}
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="home-container">
          <Navbar />
          {/* <Slider {...settings} className="slide-container"> */}
          <Carousel
            autoPlay={true}
            interval={3000}
            showStatus={false}
            showArrows={false}
            infiniteLoop={true}
            showThumbs={false}
          >
            <div className="slide-2">
              <p>
                Une Manicure parfaite <br /> en un clin d'oeil <br /> avec nos{" "}
                <span translate="no">press on nails</span>
                <br /> tendance
              </p>
              <Link to="/content1" className="content-link">
                ACHETER VOS <span translate="no">PRESS ON NAILS</span>
              </Link>
            </div>
            <div className="slide-3">
              <p>
                Des levres irresistibles avec
                <br /> le kit <span translate="no">LIPS BOOSTER</span> creme
                <br /> pour sublimer votre sourire.
              </p>
              <Link to="/content2" className="content-link">
                ACHETER VOS <span translate="no">LIPS BOOSTER</span> CREME
              </Link>
            </div>
          </Carousel>
          {/* </Slider> */}
          {/* <div className="guaranteed-effect">
        <div className="box-content">
          <h2>UN EFFET GARANTI TOUTE LA JOURNÉE</h2>
          <p>
            Paragraphe. Cliquez ici pour ajouter votre propre texte. Cliquez sur
            « Modifier Texte » ou double-cliquez ici pour ajouter votre contenu
            et personnaliser les polices.
          </p>
          <Link to="/en-savoir-plus" className="more-link">
            EN SAVOIR PLUS
          </Link>
        </div>
      </div> */}
          <div className="press-on-nails">
            <div className="box-content">
              <p>
                Ongles parfaits / <br /> Main irrésistibles
              </p>
              <p>
                #Optez pour nos <span translate="no">press on nails</span>
              </p>
              <Link>Acheter</Link>
            </div>
          </div>
          <br />
          <br />
          <div className="best-products">
            <p>
              MEILLEURS VENTES <br /> <h6>CHEZ CAPRICE BEAUTY</h6>
            </p>

            <div className="product-list">
              {products.map((product, index) => (
                <div key={index} className="product">
                  <img src={product.image} alt="" />
                  <br />
                  <h4 translate="no">{product.name}</h4>
                  <p>{product.price} F CFA</p>
                </div>
              ))}
            </div>

            <Link to={"/boutique"}>ALLER A LA BOUTIQUE</Link>
          </div>
          <br />
          <br />
          <div className="lips-booster-creme">
            <div className="box-content">
              <p>
                Lèvres captivante /<br /> Séduction absolue
              </p>
              <p>
                #Choisissez nos <span translate="no">lips booster</span> crème
              </p>
              <Link>Acheter</Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
