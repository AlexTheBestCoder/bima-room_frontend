import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import hero_img from "../../assets/hero-img.jpg";
import grille_tarifaire from "../../assets/grille-tarifaire.jpg";
import { MutatingDots } from "react-loader-spinner";

export default function Egerie() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

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
          <div className="egerie-box-container">
            <div className="header">
              <div className="title">EGERIE</div>
            </div>
            <div className="main-box">
              <div className="box-container-left box-container">
                <div className="header"></div>
                <div className="main">
                  <img src={hero_img} alt="hero_img" />
                  <br />
                  <p>
                    L'influenceuse Ivoirienne Sasha Caprice, plus connue sous le
                    nom de la Pancarte est égérie de plusieurs marques de luxe
                    et Directrice de l'entreprise BIMA ROOM. En 2019 elle lance
                    la marque Caprice Beauty un pôle de l'entreprise qui
                    confectionne les Press On Nails beaucoup apprécié par les
                    artistes, animatrices et plusieurs stars du web Ivoiriens. <br /> <br /> -
                    Date de naissance : 4 juin 1994 (Âge: 29 ans), <br /> - Taille :
                    1,71 m Mensurations : 33-23-35 (US); 83-59-88 (EU) <br /> - Poids :
                    71 <br /> + de 250 pub réalisées au cours de l'année 2023.
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
      )}
    </>
  );
}
