const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mariadb = require('mariadb');
const passport = require('passport');
const User = require('./models/user')
const config = require("./config"); //Importa modulo de APIKEYS y APISECRETS

const pool = mariadb.createPool({
  host: 'localhost', 
  user:'root',
  database: 'movieproject', 
  connectionLimit: 5}
);

//************GUARDAR USUARIO EN LA SESION************
/* function(passport){ */
     passport.serializeUser(function(user, done){
         done(null, user);
     });
     passport.deserializeUser(function(obj, done){
         done(null, obj);
     })
   /*  }  */

passport.use(new GoogleStrategy({
    clientID: config.google.OAUTH2_CLIENT_ID,
    clientSecret: config.google.OAUTH2_CLIENT_SECRET,
    callbackURL: config.google.OAUTH2_CALLBACK
  },
  

  async function(accessToken, refreshToken, profile, done) {
    console.log('PROFILE *************',profile, '*******************FIN PROFILE');
    connection =  await pool.getConnection();
      connection.query("select * from users",function(err,rows){
        console.log(rows);
        console.log("above row object");
        if (err)
                  return done(err);
        if (rows.length) {
                  return done(null, false);
              }
      })
  }
))

module.exports = passport;