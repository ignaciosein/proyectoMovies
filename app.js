const express = require("express");
const app = express();
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
app.use("/Public", express.static('Public'));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})