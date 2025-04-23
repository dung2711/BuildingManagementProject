import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import User from "../models/User.js"
import { loginValidator } from "../validators/authValidator.js";

passport.use("local", new Strategy({
  usernameField: "email"
}, async function verify(email, password, cb) {
  try {
    const {error} = loginValidator.validate({email, password});
    if(error){
      return cb(error);
    }
    const result = await User.findOne({
      where: {
        email: email,
      },
    });
    if (result) {
      const user = result.dataValues;
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, valid) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return cb(err);
        } else {
          if (valid) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (error) {
    console.log(error);
  }
}))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


export default passport;