require('dotenv').config()
const jwt = require('jsonwebtoken');
/* const Movies = require('../models/schemas') */
let bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "admin"
} 


const logica = {
    cryptoW : (word)=>{
        return bcrypt.hashSync(word, salt)
      },
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
    generateToken : (email,admin)=>{
        let tkn = jwt.sign({email: email, admin: admin}, process.env.SECRET, { expiresIn: '10h' });
        return tkn;
    }
}

 
module.exports = logica