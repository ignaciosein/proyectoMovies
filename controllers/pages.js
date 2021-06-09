 
const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const apiKey = process.env.APIKEY;
 
 

const pages = {
    home: (req, res)=>{
        res.status(200).render("home");
    },
    postLogin: (req, res)=>{
        const user = {
            user : req.body.loginUser,
            password : req.body.loginPasswordUser
        }
        if(logica.validateUser(user)){
            if(logica.generateToken(user)){
                let token = logica.generateToken(user);
                res.cookie('token',token);
                if(logica.getRolUser(user) == "admin"){
                    /* res.status(200).send(`Aqui va la pantalla del ADMIN ${token}`) */
                    res.status(200).render("admin") //plantilla admin
                }else if(logica.getRolUser(user) == "user"){
                    /* res.status(200).send(`Aqui va la pantalla del USER ${token}`) */
                    res.status(200).render("user") //plantilla user
                }
            }else{
                res.status(400).send('Aqui va el ERROR del TOKEN')
                /* res.status(200).render("plantilladerror",{error:"de usuario"})  */
            }
        }else{
            res.status(400).send('USAURIO NO EXISTE')//redireccionar a la plantilla de registro
             /* res.status(200).render("plantilladerror",{error:"usuario no exite"})  */
        }
    },
    postSingUp : (req,res) =>{
        const user = {
            user : req.body.loginUser,
            email : req.body.emailUser,
            password : req.body.loginPasswordUser
        }
        console.log(user.user)
        if(!logica.getUser(user)){
            if(logica.createUser(user)){
                //si todo va bien se devuelve la página de inicio del usuario
                res.status(200).send('Usuario no existe OOKKK')
            }else{
                res.status(400).send('ERROR AL CREAR EL USUARIO')
            }
        }else{
            res.status(400).send('USAURIO YA EXISTE')
        }
    },
    getDashboard: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    postSearch: async (req, res)=>{
        let movie = req.body.peliculaBuscar;

        
        let data = await pelis.getMovie(`http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`);
       
        let arrayVacio = [];    
        for (let index = 0; index < data.Search.length; index++) {
           
            let idDePelis = data.Search[index].imdbID
            
            let data2 = await pelis.getMovie(`http://www.omdbapi.com/?i=${idDePelis}&apikey=${apiKey}`);

             
             
            let Director = data2.Director
            let Genre = data2.Genre
            let Actors = data2.Actors
            let Title = data2.Title

           /*  console.log(`Director : ${Director},Genero :${Genre},Actor : ${Actors}, Titulo: ${Title}`); */

            

            arrayVacio.push(`{Director: ${Director}, Genero: ${Genre}, Actor: ${Actors}, Titulo: ${Title}},`)

         }
      
         console.log(arrayVacio );

         console.log(object);
         res.status(200).render("searchAllDetails", arrayVacio );
      
        /* console.log(titulo); */
   
 
         
        
       /*  res.status(200).render('film', data); */
      
        
  

       
        


   
        /* res.status(200).render("searchAllDetails", data ); */
   
        // req.body.loginUser;
    },
    getSearch:   (req, res)=>{
        
        res.status(200).render("search");
        // req.body.loginUser;
    },
    getSearchTitle: (req, res)=>{
        res.status(200).render("searchTitle");
        // req.body.loginUser;
    },
    getMovies: async (req, res) => {

        let tituloDePelicula = req.params.title;
        let data = await pelis.getMovie(`http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`);
        res.status(200).render('film', data);
    },
    postMakeMovie: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    putMovie: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    delMovie: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    }
}


 
module.exports = pages;