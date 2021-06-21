const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const mySqlM = require('../models/usersGoogle')
const logica = require('../utils/logica')
const config = require("../config"); //Importa modulo de APIKEYS y APISECRETS




passport.use(new GoogleStrategy({
  clientID: config.google.OAUTH2_CLIENT_ID,
  clientSecret: config.google.OAUTH2_CLIENT_SECRET,
  callbackURL: config.google.OAUTH2_CALLBACK
},  
async function(req, accessToken, refreshToken, profile, done) {
if(profile.emails[0].value != undefined ){
        const user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        password: logica.cryptoW(profile.displayName),
        admin: 0,
        token: logica.generateToken(profile.emails[0].value,0)
      }



    passport.deserializeUser(function(obj, done){
        done(null, obj);
    })

      const dataUser = Object.values(user)
      let result = await mySqlM.searchOneUser(user.email)
      if (result[0].num == 0 ){
        let data = await mySqlM.createUser(dataUser)
        if (data.affectedRows==1){
            passport.serializeUser(function(usr, done){
                done(null,{
                    email: user.email,
                    token: user.token
                })
                });
            return done(null, true)
        }else{
          return done(null, false)
        }
      }else{
        let newToken = logica.generateToken(user.email,user.admin)
        let result = await mySqlM.insertNewToken(user.email,newToken)
        if(result.affectedRows==1){
            passport.serializeUser(function(usr, done){
                done(null,{
                    email: user.email,
                    token: newToken
                })
                });
            return done(null, true)
        }else{
            return done(null, false)
        }
      }
  } else {
      return done(null, false);
  }

  }
))

module.exports = passport;