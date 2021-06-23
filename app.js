require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
const passport = require("./middlewares/passport");
const cookieParser = require('cookie-parser');


app.set("view engine", "pug");
app.set("views", "./views");
app.use("/Public", express.static('Public'));

mongoose.connect(process.env.projectMoviesDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex : true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})