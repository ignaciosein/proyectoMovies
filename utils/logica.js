require('dotenv').config()
const jwt = require('jsonwebtoken');
const Movies = require('../models/schemas')

const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "admin"
} 


const logica = {
    validateUser : (data) => {
        return data.user==usurioDB.name && data.password==usurioDB.password ;
    },  
    getRolUser : (data) =>{
        return usurioDB.rol;
    },
    generateToken : (data)=>{
        let tkn = jwt.sign({user: data.user}, process.env.SECRET, { expiresIn: '10h' });
        return tkn;
    },
    getUser : (data) =>{
        return (data.user == usurioDB.name)
    },
    createUser : (data) =>{
        return true //query para crear un usuario en la BBDD
    },
    saveMovie: async (data)=>{
        const movie = new Movies({
            title: data.title,
            year: data.year,
            director: data.director,
            gender: data.gender,
            duration: data.duration,
            image: data.image,
            time: data.time
          });
          try {
            const newMovie = await movie.save();
            console.log('ok', newMovie)
            return true
          } catch (err) {
            console.log(err)
            return false
          }
    }
}

module.exports = logica