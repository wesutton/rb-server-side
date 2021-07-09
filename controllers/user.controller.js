let express = require('express');
let router = express.Router();
const {User} = require("../models");// make sure not to specify so that it includes all files within the models folder

router.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      if (user) {
        res.status(200).json({ message: "New user", user });
      } else {
        res.json({ message: "Could not create user" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  

module.exports = router;