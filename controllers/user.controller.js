let express = require('express');
let router = express.Router();
const {User} = require("../models");// make sure not to specify so that it includes all files within the models folder
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// router.get("/", async (req, res) => {
//   try {
//     const users = await User.findAll({
//       include: ["messages"],
//     });

//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.post("/register", async (req, res) => {
    try {
      const user = await User.create({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       username: req.body.username, 
       password: bcrypt.hashSync(req.body.password, 13)
      });
  
      if (user) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(200).json({ 
          message: "New user registered", user, sessionToken: token});
      } else {
        res.json({ message: "Could not create user" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // router.post('/login', function (req, res){
  //   User.findOne({
  //     where: {
  //       username: req.body.username
  //     }
  //   })
  //   .then(function loginSuccess(user) {
  //     if (user) {
  //          bcrypt.compare(req.body.password, password, function (err, matches) {

  //           if (matches){
           
  //           let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    
  //            res.status(200).json({ 
  //               user: user, 
  //               message: "User logged in", 
  //               sessionToken: token 
  //             });
  //        } else {
  //           res.status(502).send({ error: "login Failed"});
  //        }
  //       });
  //     } else {
  //       res.status(500).json({ error: "User does not exist"});
  //     }
  //   })
  //   .catch(err => res.status(500).json({ error: err}))
  // });

  

  router.post('/login', async (req, res) => {
    try{
    const user = await User.findOne({
      where: {
      username: req.body.username
    }
    })
    if (user) {                         //make sure to keep user.
      bcrypt.compare(req.body.password, user.password, function (err, matches) { //user.password is pulling is coming from const user not the json format
        if (matches){
     
      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

      res.status(200).json({ message: "User logged in", user, sessionToken: token });
      }
     })
    } else {
      res.json({ message: "Could not find user" });
    }

  } 
  catch (error) {
    res.status(500).json({ error });
  }
  });
  

module.exports = router;