import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./RegisterForm.css";
import img_form from "../../assets/registration-form-4.jpg";
import { MutatingDots, Rings } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [activeInput, setActiveInput] = useState(""); // Nouvel état
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bima-room-backend-ujzj.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );
      navigate("/connexion");
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleInputFocus = (inputId) => {
    setActiveInput(inputId); // Met à jour l'ID de l'input actif
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <Rings
            height="250"
            width="250"
            color="#d39932"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="enregistrement-container">
            <div className="form-container">
              <div className="img-form-container">
                <img src={img_form} alt="img_form" />
              </div>
              <form onSubmit={handleSubmit}>
                <p className="form-title">S'inscrire</p>
                <div className="input-container-wrapper">
                  <div
                    className={`input-container ${
                      activeInput === "name" || name ? "active" : ""
                    }`}
                  >
                    <div className="input-icon"></div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      placeholder="NOM"
                      onFocus={() => handleInputFocus("name")}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div
                    className={`input-container ${
                      activeInput === "email" || email ? "active" : ""
                    }`}
                  >
                    <div className="input-icon"></div>
                    <input
                      type="email"
                      id="email"
                      placeholder="E-MAIL"
                      value={email}
                      onFocus={() => handleInputFocus("email")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    className={`input-container ${
                      activeInput === "password" || password ? "active" : ""
                    }`}
                  >
                    <div className="input-icon"></div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      placeholder="MOT DE PASSE"
                      onFocus={() => handleInputFocus("password")}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="submit-container">
                  <button type="submit" className="submit-button">
                    S'enregistrer
                  </button>
                  <p>
                    Vous avez déjà un compte?{" "}
                    <Link to={"/connexion"}>Connexion</Link>
                  </p>
                </div>
              </form>
            </div>
            {message && <p className="message">{message}</p>}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Register;
