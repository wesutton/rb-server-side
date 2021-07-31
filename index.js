require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller");
const messageController = require("./controllers/message.controller");
const favoriteController = require("./controllers/message.controller")
const {sequelize} = require("./models/index");

require("./models/associations");

app.use('/test', function(req, res){
    res.send('this is the test endpoint of our server on port 3005 ')
})

sequelize.sync();
app.use(require('./middleware/headers'))

app.use(express.json());
app.use("/user", userController);
app.use("/message", messageController);
app.use("/favorite", favoriteController)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`) 
});