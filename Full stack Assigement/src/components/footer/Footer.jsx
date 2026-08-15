import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>SHOP.CO</h2>

          <p>
            We have clothes that suits your style
            <br />
            which you're proud to wear.
            <br />
            Women to men.
          </p>

          <div className="social-icons">
            <span>𝕏</span>
            <span>f</span>
            <span>◎</span>
            <span>◉</span>
          </div>
        </div>


        {/* COMPANY */}
        <div className="footer-column">
          <h3>COMPANY</h3>

          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Works</a>
          <a href="#">Career</a>
        </div>


        {/* HELP */}
        <div className="footer-column">
          <h3>HELP</h3>

          <a href="#">Customer Support</a>
          <a href="#">Delivery Details</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>


        {/* FAQ */}
        <div className="footer-column">
          <h3>FAQ</h3>

          <a href="#">Account</a>
          <a href="#">Manage Deliveries</a>
          <a href="#">Orders</a>
          <a href="#">Payments</a>
        </div>


        {/* RESOURCES */}
        <div className="footer-column">
          <h3>RESOURCES</h3>

          <a href="#">Free Books</a>
          <a href="#">Development Tutorial</a>
          <a href="#">How-to</a>
          <a href="#">Youtube Playlist</a>
        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          Shop.co © 2000-2023, All Rights Reserved
        </p>

        <div className="payment-methods">
          <span>VISA</span>
          <span>🔴</span>
          <span>Pay</span>
          <span>▣</span>
          <span>G Pay</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;