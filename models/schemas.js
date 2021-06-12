const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    id : { 
        type:Number
    },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
      }
});

localMoviesSchemas.plugin(AutoIncrement, {inc_field: 'id'});
const Movies = mongoose.model("localMovie",localMoviesSchemas);
module.exports = Movies