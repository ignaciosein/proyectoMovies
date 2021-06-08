const logica = require("../utils/logica");
const cookieParser = require('cookie-parser');

const pages = {
    home: (req, res)=>{
        res.status(200).render("home");
        // req.body.loginUser;
    },
    postHome: (req, res)=>{
        const user = {
            user : req.body.loginUser,
            password : req.body.loginPasswordUser
        }
        if(logica.compruebaUsuario(user)){
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
                res.status(200).send('Aqui va el ERROR del TOKEN')
                /* res.status(200).render("usuario") *///crear una plantilla de errores
            }
        }else{
            res.status(200).send('USAURIO NO EXISTE')//redireccionar a la plantilla de registro
        }
    }

}

module.exports = pages;