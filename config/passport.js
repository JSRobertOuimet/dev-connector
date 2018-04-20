const
  JwtStrategy = require("passport-jwt").Strategy,
  extractJwt = require("passport-jwt").ExtractJwt,
  mongoose = require("mongoose"),

  User = mongoose.model("user"),
  keys = require("../config/keys"),

  options = {};

options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if(user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};