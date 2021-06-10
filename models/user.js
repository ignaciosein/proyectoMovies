const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/oauthRRSS', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

const UserSchema = new Schema({
    name       : String,
    provider   : String,
    provider_id: {type: String, unique: true},
    photo      : String,
    createdAt  : {type: Date, default: Date.now}
});

const User = mongoose.model("User", UserSchema);

const usuario = new User ({
    name: "Pepe",
    provider: "Perez",
    provider_id: "1",
    photo: "photo",
    
})
let u = async () =>{ 
    const newUser = await usuario.save();
    return newUser
}
u().then(x => console.log(x))
