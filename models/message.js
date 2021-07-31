// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define("message", {
//       body: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       owner: {
//         type: DataTypes.INTEGER,
//       }
//     });
//   };

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER
    },
    username:{
      type: DataTypes.STRING
    }
  })
  return Message
}
  