const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
  .route("/")
  .post(usersController.createUser)
  
  router
  .route("/:uid")
  .get(usersController.searchUser)
  

module.exports = router;
