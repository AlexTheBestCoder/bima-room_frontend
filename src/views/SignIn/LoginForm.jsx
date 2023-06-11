import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import img_form from "../../assets/registration-form-4.jpg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MutatingDots, Puff, Rings } from "react-loader-spinner";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        {
          email,
          password,
        }
      );
      navigate("/");
      console.log(response.data.token);
      console.log(response.data.userId);
      // Enregistrer le token dans un cookie
      setCookie("userId", response.data.userId, { path: "/" });
      setCookie("token", response.data.token, { path: "/" });
    } catch (error) {
      console.error(error);
    }
  };
  const [activeInput, setActiveInput] = useState("");
  const handleInputFocus = (inputId) => {
    setActiveInput(inputId); // Met à jour l'ID de l'input actif
  };

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
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
          <div className="enregistrement-container">
            <div className="form-container">
              <div className="img-form-container">
                <img src={img_form} alt="img_form" />
              </div>
              <form onSubmit={handleSubmit}>
                <p className="form-title">Se connecter</p>
                <div
                  className="input-container-wrapper"
                  style={{ height: "9rem" }}
                >
                  <div
                    className={`input-container ${
                      activeInput === "email" || email ? "active" : ""
                    }`}
                  >
                    <div className="input-icon"></div>
                    <input
                      type="text"
                      id="name"
                      value={email}
                      placeholder="EMAIL"
                      onFocus={() => handleInputFocus("email")}
                      onChange={handleEmailChange}
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
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="submit-container">
                  <button type="submit" className="submit-button">
                    Se connecter
                  </button>
                  <p>
                    Vous n'avez pas de compte?{" "}
                    <Link to={"/inscription"}>Inscription</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default LoginForm;
