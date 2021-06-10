const express = require("express");
const app = express();
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
app.use("/Public", express.static('Public'));
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");

mongoose.connect(process.env.projectMoviesDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})