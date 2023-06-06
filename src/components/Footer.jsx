import React from 'react'
import snapchat_logo from "../assets/snapchat_logo.png";
import facebook_logo from "../assets/facebook_logo.png";
import instagram_logo from "../assets/instagram_logo.png";

export default function Footer() {
  return (
    <footer>
    <div className="address-container">
      <div className="address box-container">
        <p style={{ fontSize: "20px" }}>ADDRESSE</p>
        <p>Cocody, Angré</p>
      </div>
      <div className="contact box-container">
        <p style={{ fontSize: "20px" }}>CONTACT</p>
        <p>Tel: 0747650257</p>
        <p>Email: contact@bimaroom.com</p>
      </div>
      <div className="opening-hours box-container">
        <p style={{ fontSize: "20px" }}>HORAIRES D'OUVERTURES</p>
        <p>Du lundi au samedi</p>
        <p>De 10h à 20h</p>
      </div>
    </div>
    <div className="social-media-icons">
      <a href="https://www.facebook.com/profile.php?id=100021732518907&mibextid=LQQJ4d">
        <img src={facebook_logo} alt="Facebook" />
      </a>
      <a href="https://instagram.com/caprice_bysasha?igshid=MzRlODBiNWFlZA==">
        <img src={instagram_logo} alt="Instagram" />
      </a>
      <a href="https://t.snapchat.com/Qxxoc7iX">
        <img src={snapchat_logo} alt="Twitter" />
      </a>
    </div>
  </footer>
  )
}
