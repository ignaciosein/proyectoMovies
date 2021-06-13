const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const localMoviesSchemas = new Schema({
    Title:{
        type:String,
        required: true,
        unique: true
    },
    Year:{
        type: Number,
        required: true
    },
    Director:{
        type:String,
        require: true
    }, 
    Gender: {
        type:String,
        require: true
    },
    Duration : {
        type:String,
        required: true
    },
    Poster : {
        type:String,
        required: true
    },
    Id : { 
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