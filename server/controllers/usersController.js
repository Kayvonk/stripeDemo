const db = require("../models");
// Defining methods for the usersController

module.exports = {
  searchUser: function (req, res) {
    db.User.findOne({ uid: req.params.uid })    
      .then((dbModel) => {
        if (!dbModel) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(dbModel);
      })
      .catch((err) => {
        console.error(err);
        res.status(422).json(err);
      });
  },  
  createUser: async (req, res) => {
    const { username } = req.body;

    try {
      const newUser = new db.User({
        username
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User saved successfully", user: newUser });
    } catch (error) {
      res.status(500);
    }
  },  
};
