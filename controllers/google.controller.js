const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const mySqlM = require('../models/usersGoogle')
const logica = require('../utils/logica')
const config = require("../config"); //Importa modulo de APIKEYS y APISECRETS

const gUser = {
    gUserA : (req, res) => {
        console.log('entramoss')
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
         function(accessToken, refreshToken, profile) {
             console.log('entro en la funcion ')
            console.log(profile)
        if(profile.emails[0].value != undefined ){
            console.log('funciono')
            res.status(200).send('funciono')
/*                 const user = {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: logica.cryptoW(profile.displayName),
                admin: 0,
                token: logica.generateToken(profile.emails[0].value,0)
            }
            const dataUser = Object.values(user)
            let result = await mySqlM.searchOneUser(user.email)
            console.log('numero de users:', result[0].num)
            if (result[0].num == 0 ){
                let data = await mySqlM.createUser(dataUser)
                if (data.affectedRows==1){
                    return done(null, true)
                }else{
                return done(null, false)
                }
            }else{
                let newToken = logica.generateToken(user.email,user.admin)
                let result = await mySqlM.insertNewToken(user.email,newToken)
                if(result.affectedRows==1){
                    return done(null, true)
                }else{
                    return done(null, false)
                }
                
            } */
        } else {
            /* return done(null, false); */
            console.log('no funciono')
            res.status(500).send('NOOO funciono')
        }

        }
        ))
    }

}
module.exports = gUser;