const logica = require("../utils/logica")

const pages = {
    home: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    postHome: (req, res)=>{
        let usuario = req.body.loginUser;
        let password = req.body.loginPasswordUser;

        
        console.log(usuario, password); 
        logica.compruebaUsuario(usuario,password)?(
            logica.getRolUser(usuario) == "admin"? res.status(200).render("admin"):res.status(200).render("usuario")
            ):(
                res.status(400).send("usuario no valido")
                )
        
       
    },
    getDashboard: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    getDashboard: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    getSearch: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    getSearchTitle: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    getMovies: (req, res)=>{
        res.status(200).render("home");
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
    },

}


module.exports = pages;