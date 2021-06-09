 
const logica = require("../utils/logica");

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
                    res.status(200).send(`Aqui va la pantalla del ADMIN ${token}`)
                    /* res.status(200).render("admin") *///plantilla admin
                }else if(logica.getRolUser(usuario) == "user"){
                    res.status(200).send(`Aqui va la pantalla del USER ${token}`)
                    /* res.status(200).render("usuario") *///plantilla user
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
                //
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
    getDashboard: (req, res)=>{
        res.status(200).render("dashboard");
        // req.body.loginUser;
    },
    getSearch: (req, res)=>{
        res.status(200).render("search");
        // req.body.loginUser;
    },
    getSearchTitle: (req, res)=>{
        res.status(200).render("searchtitle");
        // req.body.loginUser;
    },
    getMovies: (req, res)=>{
        res.status(200).render("movies");
        // req.body.loginUser;
    },
    postSignup: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    postLogin: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
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