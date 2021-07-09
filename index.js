const express = require("express");

const userController = require("./controllers/user.controller");
const {sequelize} = require("./models/index");

const app = express();

app.use('/test', function(req, res){
    res.send('this is the test endpoint of our server on port 3005 ')
})

app.use(express.json());

app.use("/user", userController);

sequelize.sync();

app.listen(3005, () => console.log("listening on port 3005"));