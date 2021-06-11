const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localMoviesSchemas = new Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    year:{
        type: Number,
        required: true
    },
    director:{
        type:String,
        require: true
    }, 
    gender: {
        type:String,
        require: true
    },
    duration : {
        type:String,
        required: true
    },
    image : {
        type:String,
        required: true
    },
    time : { type: String, default: () => Math.floor(Date.now() / 1000)},
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
      }
});

const Movies = mongoose.model("localMovie",localMoviesSchemas);
module.exports = Movies