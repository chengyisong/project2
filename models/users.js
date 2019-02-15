module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: DataTypes.STRING,
    currenthighscore: DataTypes.INTEGER,
    pictureurl: DataTypes.STRING,
    catDog: DataTypes.STRING,
    city: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return users;
};
