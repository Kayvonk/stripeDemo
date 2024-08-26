const db = require("../models");
// Defining methods for the usersController

module.exports = {
  searchProduct: function (req, res) {
    db.Product.find({ productParam: req.params.productParamId })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  searchAllProducts: function (req, res) {
    db.Product.find({})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },  
};
