import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RegisterForm.css";
import img_form from "../../assets/registration-form-4.jpg";
import { MutatingDots } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [activeInput, setActiveInput] = useState(""); // Nouvel état
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1200);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("L'e-mail n'est pas valide")
      .required("L'e-mail est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre")
      .required("La confirmation du mot de passe est requise"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://bima-room-backend-ujzj.onrender.com/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate("/connexion");
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleInputFocus = (inputId) => {
    setActiveInput(inputId); // Met à jour l'ID de l'input actif
  };

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <p className="form-title">S'inscrire</p>
                  <div className="input-container-wrapper">
                    <div
                      className={`input-container ${
                        activeInput === "name" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon"></div>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="NOM"
                        onFocus={() => handleInputFocus("name")}
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                    <div
                      className={`input-container ${
                        activeInput === "email" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon"></div>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-MAIL"
                        onFocus={() => handleInputFocus("email")}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                    <div
                      className={`input-container ${
                        activeInput === "password" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon"></div>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="MOT DE PASSE"
                        onFocus={() => handleInputFocus("password")}
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                    <div
                      className={`input-container ${
                        activeInput === "confirmPassword" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon"></div>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="CONFIRMATION DU MOT DE PASSE"
                        onFocus={() => handleInputFocus("confirmPassword")}
                      />
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
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
                  {message && <p className="error-message">{message}</p>}
                </Form>
              </Formik>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Register;
