require('dotenv').config()
const jwt = require('jsonwebtoken');
const Movies = require('../models/schemas')

const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "user"
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
        return true 
    },
    loadlLocalMovies:async () =>{
        let resultM = await  Movies.find()
        return resultM 
    },
    findOneLocalMovies: async (id) =>{
        let resultOne = await  Movies.find({IdPelicula: `${id}`})
        return resultOne
    }
}

module.exports = logica