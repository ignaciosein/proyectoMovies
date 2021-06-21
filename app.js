const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./models/user");
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
app.use("/Public", express.static('Public'));
const cookieParser = require('cookie-parser');
const passport = require("./passport");

app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", router);


app.use(passport.initialize());
app.use(passport.session());

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
})

app.get('/auth/google',passport.authenticate('google', { 
  scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.profile', 
        'https://www.googleapis.com/auth/userinfo.email'] 
}));


app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/admin' }), function(req, res) {
    res.redirect('/');
  });

app.listen(PORT, ()=>{
  console.log(`EJEMPLO http://localhost:${PORT}`);
});
