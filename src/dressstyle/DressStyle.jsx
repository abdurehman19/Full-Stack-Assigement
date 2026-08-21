import "./DressStyle.css";

import Casual from "../assets/dress style/image 11.png";
import Formal from "../assets/dress style/image 13.png";
import Party from "../assets/dress style/image 12.png";
import Gym from "../assets/dress style/image 14.png";

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

    <div className="dress-row">
        <DressCard
            title="Casual"
            image={Casual}
        />

        <DressCard
            title="Formal"
            image={Formal}
        />
    </div>


    <div className="dress-row">
        <DressCard
            title="Party"
            image={Party}
        />

        <DressCard
            title="Gym"
            image={Gym}
        />
    </div>

</div>

    </section>
  );
}

export default DressStyle;