import React, { useRef } from "react";
import "./HappyCustomers.css";

const reviews = [
  {
    name: "Sarah M.",
    review:
      "The clothes were stylish and the quality was excellent. I have already recommended this store to my friends.",
  },
  {
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.",
  },
  {
    name: "James L.",
    review:
      "The selection of pieces I have found here is amazing. The latest trends are always available.",
  },
  {
    name: "Maria D.",
    review:
      "Amazing quality and very comfortable clothes. Definitely ordering again.",
  },
  {
    name: "John S.",
    review:
      "Great products, fast delivery and the quality is really impressive.",
  },
];

function HappyCustomers() {

  // Reviews wale div ko control karega
  const reviewsRef = useRef(null);

  // LEFT ARROW
  const handlePrev = () => {
    reviewsRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  // RIGHT ARROW
  const handleNext = () => {
    reviewsRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="customers">

      {/* HEADER */}
      <div className="customers-header">

        <h2>OUR HAPPY CUSTOMERS</h2>

        <div className="customer-arrows">

          <button onClick={handlePrev}>
            ←
          </button>

          <button onClick={handleNext}>
            →
          </button>

        </div>

      </div>


      {/* REVIEWS */}
      <div
        className="reviews"
        ref={reviewsRef}
      >

        {reviews.map((item, index) => (

          <div className="review-card" key={index}>

            <div className="stars">
              ★★★★★
            </div>

            <h3>
              {item.name}
              <span>✓</span>
            </h3>

            <p>
              {item.review}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HappyCustomers;