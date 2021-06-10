const express = require("express");
const app = express();
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
app.use("/Public", express.static('Public'));
const cookieParser = require('cookie-parser');
//REQ LOGIN RRSS
const passport = require("./passport");
const mongoose = require("mongoose");
require("./models/user");
require("./passport")(passport)


app.use(cookieParser())

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})

// LOGIN CON RRSS

mongoose.connect("mongodb:localhost:27017/oauthRRSS", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
})
app.get("/auth/twitter", passport.authenticate("twitter"));
app.get("/auth/facebook", passport.authenticate("facebook"));