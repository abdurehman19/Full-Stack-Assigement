import { Link } from "react-router-dom";
import "./Hero.css";

import HeroImage from "../assets/images/hero.png";

const Hero = () => {
  return (
    <section className="hero">

      {/* Left Content */}
      <div className="hero-content">

        <h1>
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </h1>

        <p className="hero-description">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <Link to="/shop" className="hero-btn">
          Shop Now
        </Link>

        {/* Stats */}
        <div className="hero-stats">

          <div className="stat">
            <h2>200+</h2>
            <p>International Brands</p>
          </div>

          <div className="stat">
            <h2>2,000+</h2>
            <p>High-Quality Products</p>
          </div>

          <div className="stat">
            <h2>30,000+</h2>
            <p>Happy Customers</p>
          </div>

        </div>

      </div>

      {/* Right Image */}
      <div className="hero-image">

        <img
          src={HeroImage}
          alt="Fashion models"
        />

        {/* Decorative Stars */}
        <span className="hero-star star-one">✦</span>
        <span className="hero-star star-two">✦</span>

      </div>

    </section>
  );
};

export default Hero;