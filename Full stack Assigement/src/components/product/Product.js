
import tshirt2 from "../../assets/product/t shirt 2.jpeg";
import tshirt3 from "../../assets/product/t shirt 3.jpeg";
import tshirt4 from "../../assets/product/t shirt 4.jpeg";

const products = [
  {
    id: 1,
    image: tshirt2,
    name: "T-shirt with Tape Details",
    rating: "4.5",
    reviews: "456",
    price: "120",
    oldPrice: "",
    discount: "-20%",
    description:
      "This stylish t-shirt is made from comfortable fabric and is perfect for everyday wear.",
    category: "T-Shirts",
    colors: ["#000000", "#ffffff", "#777777"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },

  {
    id: 2,
    image: tshirt4,
    name: "Skinny Fit Jeans",
    rating: "3.5",
    reviews: "320",
    price: "240",
    oldPrice: "260",
    discount: "-20%",
    description:
      "A comfortable skinny fit jeans designed for a modern everyday look.",
    category: "Jeans",
    colors: ["#222222", "#1d3557"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },

  {
    id: 3,
    image: tshirt3,
    name: "Checkered Shirt",
    rating: "4.5",
    reviews: "410",
    price: "180",
    oldPrice: "",
    discount: "",
    description:
      "A classic checkered shirt that gives you a clean and casual look.",
    category: "Shirts",
    colors: ["#222222", "#ffffff"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },

  {
    id: 4,
    image: tshirt4,
    name: "Sleeve Striped T-shirt",
    rating: "4.5",
    reviews: "250",
    price: "130",
    oldPrice: "160",
    discount: "-30%",
    description:
      "A comfortable striped t-shirt with a stylish sleeve design.",
    category: "T-Shirts",
    colors: ["#000000", "#ffffff"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
];

export default products;