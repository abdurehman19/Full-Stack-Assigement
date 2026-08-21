import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <div className="newsletter-content">

        <h2>
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>

        <div className="newsletter-form">

          <div className="email-box">
            <span>✉</span>
            <input
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <button>
            Subscribe to Newsletter
          </button>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;