import React from "react";
import "./Footer.css";
import snapchat_logo from "../../assets/snapchat_logo.png";
import facebook_logo from "../../assets/facebook_logo.png";
import instagram_logo from "../../assets/instagram_logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-box-container">
        <div className="footer-height-box">
          <div className="box-container-left box-container">
            <div className="social-media-icons">
              <a href="https://instagram.com/caprice_bysasha?igshid=MzRlODBiNWFlZA==">
                <img src={instagram_logo} alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100021732518907&mibextid=LQQJ4d">
                <img src={facebook_logo} alt="Facebook" />
              </a>
              <a href="https://t.snapchat.com/Qxxoc7iX">
                <img src={snapchat_logo} alt="Snapchat" />
              </a>
            </div>
            <div className="collaboration-info">
              <p style={{ fontSize: "40px", fontWeight: "bold" }}>
                Collaborations
              </p>
              <p >
                Pour les relations presses, contactez-moi sur : <br />{" "}
                info@monsite.fr
              </p>
            </div>
          </div>
          <div className="box-container-right box-container">
            <form className="footer-form">
              <p>Vous pouvez aussi me contacter ici</p>
              <div className="fullname input-box">
                <label htmlFor="Prenom">
                  Prénom
                  <input type="text" />
                </label>
                <label htmlFor="Nom">
                  Nom
                  <input type="text" />
                </label>
              </div>
              <div className="mail input-box">
                <label htmlFor="Email">
                  E-mail *
                  <input type="email" />
                </label>
                <label htmlFor="Objet">
                  Objet
                  <input type="email" />
                </label>
              </div>
              <div className="message-box">
                <label htmlFor="Message">
                  Message
                  <input type="text" />
                </label>
              </div>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom-box">
          <div className="footer-links">
            <p>Politique de confidentialité</p>
            <p>Politique de cookies</p>
            <p>Mentions légales</p>
          </div>
          <p>© 2023 par Bima Room.</p>
        </div>
      </div>
    </footer>
  );
}
