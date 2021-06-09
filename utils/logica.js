const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "admin"
} 
require('dotenv').config()
const jwt = require('jsonwebtoken');

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
    }
}

module.exports = logica