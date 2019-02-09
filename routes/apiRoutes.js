var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbExamples) {
      console.log(dbExamples);
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.users
      .create({
        name: req.body.name,
        pictureurl: req.body.pic,
        catDog: req.body.catDog,
        city: req.body.city,
        password: req.body.password
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });

    db.users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
