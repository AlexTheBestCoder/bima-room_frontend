import React from "react";
import "./index.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import hero_img from "../../assets/hero-img.jpg";
import grille_tarifaire from "../../assets/grille-tarifaire.jpg";

export default function Egerie() {
  return (
    <>
      <Navbar />
      <div className="egerie-box-container">
        <div className="header">
          <div className="title">EGERIE</div>
        </div>
        <div className="main">
          <div className="box-container-left box-container">
            <div className="header"></div>
            <div className="main">
              <img src={hero_img} alt="hero_img" />
              <br />
              <p>
                Sasha Caprice, plus connue sous le nom de la Pancarte est une
                influenceuse Ivoirienne, et égérie de plusieurs marques de luxe
                et Directrice de l'entreprise BIMA ROOM qui commercialise  les
                Press on nails et plusieurs autres produits. <br />  Date/Lieu de
                naissance : 4 juin 1994 (Âge: 29 ans),  Taille : 1,71 m
                 Mensurations : 33-23-35 (US); 83-59-88 (EU)  Poids : 63 + de 250
                 pub réalisées au cours de l'année 2023.
              </p>
            </div>
          </div>
          <div className="box-container-right box-container">
            <div className="img-top img-box"></div>
            <div className="img-bottom img-box">
              <img src={grille_tarifaire} alt="grille_tarifaire" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
