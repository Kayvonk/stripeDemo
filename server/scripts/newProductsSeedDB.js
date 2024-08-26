const mongoose = require("mongoose");
const db = require("../models");
const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stripedemodb");

const newProductsSeed = [
  {
    productName: "Diamond Ring",
    stripeProductId: "",
    productParamId: uuidv4(),
    productDescription:
      "Introducing the Elegance Collection's exquisite Diamond Solitaire Ring. Crafted with unparalleled precision and finesse, this timeless piece is a testament to both luxury and sophistication. \n\n Each ring features a dazzling round brilliant-cut diamond, meticulously chosen for its exceptional clarity and brilliance. Set in a classic prong setting, the diamond radiates brilliance from every angle, capturing and reflecting light with unparalleled brilliance. \n\n The band itself is crafted from lustrous 18K white gold, designed to complement and enhance the beauty of the center stone. With its sleek and elegant profile, this ring effortlessly blends traditional charm with contemporary allure, making it a perfect choice for engagements, anniversaries, or any special occasion that deserves to be celebrated in style.",
    productPrice: 199.99,
    productImages: [
      "/products/rings/1/diamondRing1.png"
    ],
  },  
  {
    productName: "Silver Bracelet",
    stripeProductId: "",
    productParamId: uuidv4(),
    productDescription:
      "Discover timeless elegance with our Sterling Silver Charm Bracelet, a graceful addition to any jewelry collection. \n\n Crafted from high-quality sterling silver, this bracelet exudes sophistication and versatility. Its polished surface glimmers subtly, reflecting the light with every movement, making it a captivating piece for both casual and formal occasions. \n\n The bracelet features a delicate chain adorned with a series of intricately crafted charms, each symbolizing a unique aspect of life's beauty and meaning. From delicate hearts to shimmering stars, these charms add a touch of personalization and sentimentality to the bracelet, making it not just a piece of jewelry, but a cherished keepsake. \n\n Whether worn alone as a statement piece or layered with other bracelets for a personalized look, our Sterling Silver Charm Bracelet is designed to elevate any ensemble and inspire moments of joy and beauty. Ideal for gifting or treating yourself, it's a timeless treasure that will be cherished for years to come.",
    productPrice: 49.99,
    productImages: [
      "/products/bracelets/7/coolBracelet1.png"
    ],
  },  
  {
    productName: "Gold Earrings",
    stripeProductId: "",
    productParamId: uuidv4(),
    productDescription:
      "Introducing our Luxe 24K Gold Drop Earrings, a testament to timeless elegance and sophistication. \n\n Handcrafted with precision and passion, these earrings feature a stunning drop design that elongates the neckline and adds a touch of glamour to any ensemble. Cast in luxurious 24K gold, the earrings boast a smooth and polished surface that gleams with a rich, warm hue, creating a mesmerizing contrast against any skin tone. \n\n Each earring showcases a delicate yet intricate pattern of filigree work, crafted by skilled artisans to enhance the allure of the gold. The intricate details catch and reflect light with every movement, ensuring you sparkle and shine from every angle. These earrings are designed to effortlessly transition from day to night, making them a versatile and essential addition to your jewelry collection. \n\n Whether worn with a formal gown for a special occasion or paired with casual attire for a touch of everyday luxury, our Luxe 24K Gold Drop Earrings promise to make a statement wherever you go. They are not just accessories, but timeless treasures that embody the essence of refined style and sophistication.",
    productPrice: 99.99,
    productImages: [
      "/products/earrings/19/goldEarrings1.png"
    ],
  }, 
];
db.Product.deleteMany({})
  .then(() => db.Product.collection.insertMany(newProductsSeed))
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
