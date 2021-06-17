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
    findOneLocalMovies: async (id) =>{
        let resultOne = await  Movies.find({IdMovie: `${id}`})
        return resultOne
    }
>>>>>>> ac646062618f0aec9b983b93789e5a5e899d5931
}

module.exports = logica