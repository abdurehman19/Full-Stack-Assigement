import React from "react";
import Versace from "../../assets/marque images/versace.png";
import Zara from "../../assets/marque images/zara.png";
import Gucci from "../../assets/marque images/gucci.png";
import Prada from "../../assets/marque images/prada.png";
import Kelvin from "../../assets/marque images/kelvin.png";

import "./Marque.css";

function Marque() {
  return (
    <section className="marque">
      <div className="marque-container">
        <img src={Versace} alt="Versace" />
        <img src={Zara} alt="Zara" />
        <img src={Gucci} alt="Gucci" />
        <img src={Prada} alt="Prada" />
        <img src={Kelvin} alt="Kelvin" />
      </div>
    </section>
  );
}

export default Marque;