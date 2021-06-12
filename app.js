require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser')



app.set("view engine", "pug");
app.set("views", "./views");


mongoose.connect(process.env.projectMoviesDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex : true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use("/Public", express.static('Public'));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})