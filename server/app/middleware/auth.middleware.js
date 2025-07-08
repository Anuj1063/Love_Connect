const passport = require("passport");
const passportJWT = require("passport-jwt");
const userModel = require("../module/user/model/user.model");
const CryptoJS = require("crypto-js");

const extractDecryptedJwt = function (req) {
    const encryptedToken =
    req.cookies?.auth_token ||                     // 🔹 From cookie
    req.headers["x-access-token"] ||              // 🔸 Fallback to headers
    req.headers["token"];

  if (!encryptedToken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.CRYPTO_SECRET
    );
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
 
    return decryptedToken;
  } catch (err) {
    return null;
  }
};

const ExtractJwt = passportJWT.ExtractJwt;
const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors(
    [extractDecryptedJwt] // Then check for 'token'
  ),
};

const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;

module.exports = () => {
  const strategy = new JwtStrategy(params, async (payload, done) => {
    const user = await userModel
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(payload.userId),
            isDeleted: false,
          },
        },
      ])
      .exec();
    if (user) {
      return done(null, user[0]);
    } else {
      return done(null, false); // User not found
    }
  });

  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },

    // This is for webservice jwt token check //
    authenticateAPI: (req, res, next) => {
      passport.authenticate("jwt", process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.send({
            status: 500,
            message: "Please provide a vaid token ,your token might be expired",
          });
        }
        if (!user) {
          return res.send({
            status: 401,
            message: "Sorry user not found!",
          });
        }
        req.user = user;//[0]
        return next();
      })(req, res, next);
    },
  };
};
