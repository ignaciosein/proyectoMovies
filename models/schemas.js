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
        required: true,
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
        type:Number,
        required: true
    },
    image : {
        type:String,
        required: true
    }
});

const Movie = mongoose.model("Movie",localMoviesSchemas);
module.exports = Movie;