const express = require("express");
const router = express.Router();
let validateSession = require('../middleware/validate-session');
const db = require('../models/index');
const Favorite = db.Favorite;

router.post("/create", validateSession, async (req, res) => {
    const owner = req.user.id;
    const addFavorite = {
      favorite : req.body.favorite,
      owner : owner
    }
    try {
      const favorite = await favorite.create(
          addFavorite);
          console.log(req.user.id);
  
      if (favorite) {
        res.status(200).json({favorite });
      } else {
        res.json({ favorite: "Could not add" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  
  router.get("/mine", validateSession, (req, res) => {
    let userid =req.user.id
    Favorite.findAll({
      where: {owner: userid}
    })
    .then(favorites => res.status(200).json(favorites))
    .catch(err => res.status(500).json({error: err}))
  });
  
  router.put("/update/:favoriteId", validateSession, function(req, res){
    const updateFavoriteList = {
      favorite: req.body.favorite,
    };
  
    const query = {where: {id: req.params.favoriteId, owner: req.user.id}};
  
    Message.update(updateFavoriteList, query)
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json({ error: err}))
  })
  
  router.delete("/delete/:id", validateSession, function(req, res) {
    const query ={ where: {id: req.params.id, owner: req.user.id}};
  
    Message.destroy(query)
      .then(() => res.status(200).json({ favorite: "Favorite removed"}))
      .catch((err) => res.status(500).json({ error: err}));
  })
  
  module.exports = router;