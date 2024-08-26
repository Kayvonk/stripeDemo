const router = require("express").Router();
const productsController = require("../../controllers/productsController");

// Matches with "/api/products"
router
  .route("/")
  .get(productsController.searchAllProducts);

router.route("/:productParamId").get(productsController.searchProduct);

module.exports = router;
