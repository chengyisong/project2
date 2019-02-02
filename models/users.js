module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: DataTypes.STRING,
    currenthighscore: DataTypes.STRING,
    pictureurl: DataTypes.STRING,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    password: DataTypes.STRING
  });
 
  return users;
};
