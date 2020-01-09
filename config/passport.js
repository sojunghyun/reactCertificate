// config/passport.js

var passport   = require("passport");
var LocalStrategy = require("passport-local").Strategy; // 1
var User     = require("../models/User");

// serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
 done(null, user.id);
});
passport.deserializeUser(function(id, done) {
 User.findOne({_id:id}, function(err, user) {
  done(err, user);
 });
});

// local strategy // 3
passport.use("local-login",
 new LocalStrategy({
   usernameField : "user_name", // 3-1
   eamilField : "user_eamil", // 3-1
   passReqToCallback : true
  },
  function(req, user_name, user_eamil, done) { // 3-2
   User.findOne({user_name:user_name})
   .select({user_eamil:1})
   .exec(function(err, user) {
    if (err) return done(err);

    if (user && user.authenticate(user_eamil)){ // 3-3
     return done(null, user);
    } else {
     req.flash("username", user_name);
     req.flash("errors", {login:"Incorrect username or user_eamil"});
     return done(null, false);
    }
   });
  }
 )
);

module.exports = passport;