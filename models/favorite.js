module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
      favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      owner: {
        type: DataTypes.INTEGER
      },
    })
    return Favorite
  }
    