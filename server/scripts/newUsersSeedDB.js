const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stripedemodb");

const newUsersSeed = [
  {
    username: "Kayvon",
  },
];
db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(newUsersSeed))
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
