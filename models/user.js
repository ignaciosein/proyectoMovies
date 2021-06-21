const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/oauthRRSS', { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to db established"));

//************************************************************************************************************************DEFINE_ESQUEMA************************************************************************************************************************

const UserSchema = new Schema({
    googleId: String,
    name       : String,
    provider   : String,
    photo      : String,
    createdAt  : {type: Date, default: Date.now}
});
const User = mongoose.model("User", UserSchema);

module.exports = User;