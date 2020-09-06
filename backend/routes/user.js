const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.user.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        password: hash,
        role: req.body.user.role,
        date: Date.now(),
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'USER_IS_CREATED',
            user: result.name
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
});


router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "EMAIL_NOT_FOUND"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'INVALID_PASSWORD'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "my_very_secret_long_key",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "WELCOME",
        token: token,
        email:fetchedUser.email,
        id: fetchedUser._id,
        name: fetchedUser.name,
        role:fetchedUser.role,
        date: fetchedUser.date
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });

    })
});

module.exports = router;
