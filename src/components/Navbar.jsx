import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import btn_connexion from "../assets/connexion.png";
import btn_panier from "../assets/panier.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="Logo" style={{ height: "9vh" }} />
      </Link>
      <div className="lg:hidden">
        {/* Affiche le menu burger sur les petits écrans */}
        <button
          type="button"
          className="text-white hover:text-gray-300 focus:outline-none"
          onClick={handleMenuToggle}
        >
          <svg
            className="h-6 w-6 fill-current stroke-black"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3 12h18M3 6h18M3 18h18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>
      <ul
        className={`lg:flex lg:flex-row lg:space-x-4 mt-4 lg:mt-0 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <Link
            to={"/"}
            className="text-yellow-600 hover:text-yellow-900"
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to={"/boutique"}
            className="text-yellow-600 hover:text-yellow-900"
          >
            Boutique
          </Link>
        </li>
        <>
          {/* <li>
            <Link
              className="text-yellow-600 hover:text-yellow-900"
              translate="no"
            >
              Press On Nails
            </Link>
          </li>
          <li>
            <Link className="text-yellow-600 hover:text-yellow-900">
              <span translate="no">Lips booster</span> crème
            </Link>
          </li> */}
        </>
        <li>
          <Link className="text-yellow-600 hover:text-yellow-900">Blog</Link>
        </li>
        <li>
          <Link className="text-yellow-600 hover:text-yellow-900">
            À propos
          </Link>
        </li>
        <li>
          <Link className="text-yellow-600 hover:text-yellow-900">Contact</Link>
        </li>
        <br />
        {isSmallScreen && (
          <li>
            <Link to="/connexion">
              <button className="button-connexion text-yellow-600 ">
                <img src={btn_connexion} alt="button-connexion" />
                Connexion
              </button>
            </Link>
          </li>
        )}
      </ul>
      <div className="bouton flex items-center justify-between w-48">
        {!isSmallScreen && (
          <Link to="/connexion">
            <button className="button-connexion text-yellow-600 ">
              <img src={btn_connexion} alt="button-connexion" />
              Connexion
            </button>
          </Link>
        )}
        {!isMenuOpen && (
          <Link to={"/panier"}>
          <button>
            <img src={btn_panier} alt="btn_panier" />
          </button>
        </Link>
        )}
        
      </div>
    </nav>
  );
}
