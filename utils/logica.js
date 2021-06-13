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
    loadlLocalMovies:async () =>{
        let resultM = await  Movies.find()
        /* console.log(resultM) */
        return resultM //query para crear un usuario en la BBDD
    },
    
    
}

module.exports = logica