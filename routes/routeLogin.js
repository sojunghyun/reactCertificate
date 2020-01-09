﻿var express = require("express");
var router = express.Router();
var passport= require("../config/passport"); // 1

// Home ...

// Login // 2
router.get("/login", function (req,res) {
 var user_name = req.flash("user_name")[0];
 var errors = req.flash("errors")[0] || {};
 res.render("home/login", {
  user_name:user_name,
  errors:errors
 });
});

// Post Login // 3
router.post("/login",
 function(req,res,next){
  var errors = {};
  var isValid = true;
  if(!req.body.user_name){
   isValid = false;
   errors.user_name = "user_name is required!";
  }
  if(!req.body.user_email){
   isValid = false;
   errors.user_email = "user_email is required!";
  }

  if(isValid){
   next();
  } else {
   req.flash("errors",errors);
   res.redirect("/login");
  }
 },
 passport.authenticate("local-login", {
  successRedirect : "/",
  failureRedirect : "/login"
 }
));

// Logout // 4
router.get("/logout", function(req, res) {
 req.logout();
 res.redirect("/");
});

module.exports = router;