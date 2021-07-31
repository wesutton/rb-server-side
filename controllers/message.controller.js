const express = require("express");
const router = express.Router();
let validateSession = require('../middleware/validate-session');

const db = require('../models/index');
const Message = db.Message;

// router.get('/practice', validateSession, function(req, res){
//   res.send("this is a practice route in messages controller")
// });

// router.post('/create', validateSession, (req, res) => {
//   const messageEntry = {
//     body: req.body
//   }
//   Message.create(messageEntry)
// })


// router.get("/", async (req, res) => {
//   try {
//     const messages = await Message.findAll({
//       include: ["user"],
//     });

//     res.status(200).json({ messages });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// router.post("/create", validateSession, async (req, res) => {
//   // const {owner} = req.user.id;
//   // const newMessage = {
//   //   body : req.body,
//   //   owner : owner
//   // }
//   try {
//     const message = await Message.create(
//        req.body);

//     if (message) {
//       res.status(200).json({ message });
//     } else {
//       res.json({ message: "Could not create" });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });


router.post("/create", validateSession, async (req, res) => {
  const owner = req.user.id;
  const newMessage = {
    message : req.body.message,
    username: req.body.username,
    owner : owner
  }
  try {
    const message = await Message.create(
        newMessage);
        console.log(req.user.id);

    if (message) {
      res.status(200).json({ message });
    } else {
      res.json({ message: "Could not create" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", (req,res) => {
  Message.findAll()
  .then(messages => res.status(200).json(messages))
  .catch(err => res.status(500).json({ error: err}))
});

router.get("/mine", validateSession, (req, res) => {
  let userid =req.user.id
  Message.findAll({
    where: {owner: userid}
  })
  .then(messages => res.status(200).json(messages))
  .catch(err => res.status(500).json({error: err}))
});

router.put("/update/:messageId", validateSession, function(req, res){
  const updateMessageEntry = {
    message: req.body.message,
  };

  const query = {where: {id: req.params.messageId, owner: req.user.id}};

  Message.update(updateMessageEntry, query)
  .then((messages) => res.status(200).json(messages))
  .catch((err) => res.status(500).json({ error: err}))
})

router.delete("/delete/:id", validateSession, function(req, res) {
  const query ={ where: {id: req.params.id, owner: req.user.id}};

  Message.destroy(query)
    .then(() => res.status(200).json({ message: "message deleted"}))
    .catch((err) => res.status(500).json({ error: err}));
})

module.exports = router;