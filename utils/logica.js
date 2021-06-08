const comprobarUsuario = {
    nombre: "Luis",
    password: "1234",
    rol: "admin"
} 

const logica ={


    compruebaUsuario : (usuario,password) => {
        return usuario==comprobarUsuario.nombre && password==comprobarUsuario.password 
    },  
    getRolUser : (usuario) =>{

        return comprobarUsuario.rol
    }    







}


module.exports = logica