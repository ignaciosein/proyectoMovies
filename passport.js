const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const User = require('./models/user')
const config = require("./config"); //Importa modulo de APIKEYS y APISECRETS

//************GUARDAR USUARIO EN LA SESION************
/* function(passport){ */
     passport.serializeUser(function(user, done){
         done(null, user);
     });
     passport.deserializeUser(function(obj, done){
         done(null, obj);
     })
   /*  }  */

//   Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.google.OAUTH2_CLIENT_ID,
    clientSecret: config.google.OAUTH2_CLIENT_SECRET,
    callbackURL: config.google.OAUTH2_CALLBACK
  },
  
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(profile.emails[0].value);
    const usuario = new User ({
        googleId: profile.id,
        name: profile.displayName,
        provider: profile.provider,
        photo: profile.photos[0].value,
   })
       usuario.save(function (err, user) {
        return done(err, user);
       });
    }
))

module.exports = passport;