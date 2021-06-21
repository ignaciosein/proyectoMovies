const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const User = require('./models/user')
const mySqlM = require('./models/usersGoogle')
const logica = require('./utils/logica')
const config = require("./config"); //Importa modulo de APIKEYS y APISECRETS

// Conexión

passport.serializeUser(function(usr, done){
      done(null, usr);
  });
  passport.deserializeUser(function(obj, done){
      done(null, obj);
  })

passport.use(new GoogleStrategy({
    clientID: config.google.OAUTH2_CLIENT_ID,
    clientSecret: config.google.OAUTH2_CLIENT_SECRET,
    callbackURL: config.google.OAUTH2_CALLBACK
  },  
async function(accessToken, refreshToken, profile, done) {
  if(profile.emails[0].value != undefined ){
        const user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: logica.cryptoW(profile.displayName),
          admin: 0,
          token: logica.generateToken(profile.emails[0].value,0)
        }
        const dataUser = Object.values(user)
        console.log(user.name)
        console.log(user.email);
        let result = await mySqlM.searchOneUser(user.email)
        console.log('numero de users:', result[0].num)
        if (result[0].num == 0 ){
          console.log('es 0')
          let data = await mySqlM.createUser(dataUser)
          if (data.affectedRows==1){
            return done(null, true)
          }else{
            return done(null, false)
          }
        }else{
          console.log('No es 0')
          return done(null, false)
        }
        
    } else {
        return done(null, false);
    }

    }
))

module.exports = passport;