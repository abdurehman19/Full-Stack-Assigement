import React from "react";
import "./DressStyle.css";

import Casual from "../../assets/dress style/casual.png";
import Formal from "../../assets/dress style/formal.png";
import Party from "../../assets/dress style/party.png";
import Gym from "../../assets/dress style/gym.png";

function DressCard({ title, image, className }) {
  return (
    <div className={`dress-card ${className}`}>
      <h3>{title}</h3>

      <img src={image} alt={title} />
    </div>
  );
}

function DressStyle() {
  return (
    <section className="dress-style">

      <h2>BROWSE BY DRESS STYLE</h2>

      <div className="dress-grid">

        <DressCard
          title="Casual"
          image={Casual}
          className="casual"
        />

        <DressCard
          title="Formal"
          image={Formal}
          className="formal"
        />

        <DressCard
          title="Party"
          image={Party}
          className="party"
        />

        <DressCard
          title="Gym"
          image={Gym}
          className="gym"
        />

      </div>

    </section>
  );
}

export default DressStyle;