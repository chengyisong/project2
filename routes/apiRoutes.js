var db = require("../models");
var bcrypt = require("bcrypt");
var saltRounds = 10;
var hashedPass = "";

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Show top ten high score in decending order
  app.get("/api/users", function(req, res) {
    db.users
      .findAll({
        limit: 10,
        order: [["currenthighscore", "DESC"]]
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        hashedPass = hash;
        db.users
          .create({
            name: req.body.name,
            pictureurl: req.body.pic,
            catDog: req.body.catDog,
            city: req.body.city,
            password: hashedPass,
            currenthighscore: parseInt(req.body.currenthighscore)
          })
          .then(function(dbPost) {
            res.json(dbPost);
          });
      });
    });
  });

  app.put("/api/users", function(req, res) {
    console.log("logging req.body");
    console.log(req.body.name);
    db.users
      .findOne({ where: { name: req.body.name } })
      .then(function(dbUsers) {
        if (!dbUsers) {
          console.log("could not find user");
          // return res.status(401).render("unauthenticated");
          res.redirect("unauthenticated");
        }
        // only update if new score is higher than original score
        else if (req.body.currenthighscore > dbUsers.currenthighscore) {
          // check password
          hashedPass = dbUsers.password;
          bcrypt.compare(req.body.password, hashedPass, function(err, result) {
            if (result === true) {
              db.users
                .update(
                  {
                    currenthighscore: parseInt(req.body.currenthighscore)
                  },
                  {
                    where: {
                      name: req.body.name
                    }
                  }
                )
                .then(function(dbPut) {
                  return res.json(dbPut);
                });
            } else {
              console.log("Wrong password");
              res.redirect("unauthenticated");
            }
          });
        }
      });
  });
  app.put("/api/users", function(req, res) {
    db.users
      .update(users, {
        where: {
          name: req.body.name,
          password: req.body.password
        }
      })
      .then(function(dbUsers) {
        console.log(dbUsers);
        res.json(dbUsers);
      });
  });
};
