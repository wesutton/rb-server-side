const { User, Message } = require(".");

Message.belongsTo(User); // add foreignKey userId to message table
User.hasMany(Message, { as: "messages" }); // allows us to grab all messages that belong to user
