const mongoose = require("mongoose");
const User1 = mongoose.model("User");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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

//************AUTENTICADO CON TWITTER************
// passport.use(new TwitterStrategy({
//     consumerKey     : config.twitter.key,
//     consumerSecret  : config.twitter.secret,
//     callbackURL     : "/auth/twitter/callback"
// }, function(accessToken, refreshToken, profile, done){
//************FINDONE BUSCA USUARIO EN BBDD POR ID, Y SI NO EXISTE, LO CREA************
    // User.findOne({provider_id: profile.id}, function(err, user){
    // if(err) throw(err);
    // if(!err && user!=null) 
    // return done(null, user);
//************GUARDA EL USER EN BBDD************
    // const user1 = new User1({
    //     provider_id : profile.id,
    //     provider    : profile.provider,
    //     name        : profile.displayName,
    //     photo       : profile.photos[0].value
    // });
    // user.save(function(err){
    //     if(err) throw err;
    //     done(null, user);
    // });
// });
// }))};

// ************AUTENTICADO CON FACEBOOK************
// passport.use(new FacebookStrategy({
//     clientID        :config.facebook.id,
//     clientSecret    :config.facebook.secret,
//     callbackURL     :"/auth/facebook/callback",
//     profileFields/*no PHOTO*/   :["id", "displayName", "provider", "photos"],
// function(accessToken, refreshToken, profile, done){
 
//         User.findOne({provider_id: profile.id}, function(err, user){
//             if(err) throw(err);
//             if(!err && user!=null)
//             return done(null, user);
//         })

//     const user = new User({
//         provider_id     :profile.id,
//         provider        :profile.provider,
//         name            :profile.displayName,
//         photo           :profile.photos[0].value
//     });
//     user.save(function(err){
//         if(err) throw err;
//         done(null, user);
//     }
//     )}
// }))



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