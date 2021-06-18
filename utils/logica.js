require('dotenv').config()
const jwt = require('jsonwebtoken');
const Movies = require('../models/schemas')
let bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database: 'movieproject', 
    connectionLimit: 5});

const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "user"
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
    generateToken : (email,admin)=>{
        let tkn = jwt.sign({email: email, admin: admin}, process.env.SECRET, { expiresIn: '10h' });
        return tkn;
    },
    getUser : (data) =>{
/*         let conn
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO bbdd.mensajes value (?, ?)",[6,message]);
            console.log(res); 
          } catch (err) {
            throw err;
          } finally {
            if (conn) return conn.end();
          } */
        return false
    },
<<<<<<< HEAD
    createUser : (data) =>{
        return true 
    },
<<<<<<< HEAD
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
    },
/*       loadMovie: async (data)=>{
        
          try {
            const newMovie = await movie.save();
            console.log('ok', newMovie)
            return true
          } catch (err) {
            console.log(err)
            return false
          }
    } */
=======
    loadlLocalMovies:async () =>{
        let resultM = await  Movies.find()
        return resultM 
    },
=======
    loadlLocalMovies:async () =>{
        let resultM = await  Movies.find()
        return resultM 
    },
>>>>>>> 3929ece550455ed1621d5bc94c938592d407f94b
    findOneLocalMovies: async (id) =>{
        let resultOne = await  Movies.find({IdMovie: `${id}`})
        return resultOne
    }
>>>>>>> ac646062618f0aec9b983b93789e5a5e899d5931
}

module.exports = logica