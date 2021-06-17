const mariadb = require('mariadb');
// Conexión
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database: 'movieproject', 
    connectionLimit: 5}
);

const userMySQL = {
    createUser : async(user) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            result = await conn.query("INSERT INTO users (name,email,password,token) value (?,?,?,?)",[user.name,user.email,user.password,user.token]);
            console.log('result',result);
/*             if(result.affectedRows==1){
                res.status(200).render('message',{ type: "Info: ", message: "Usuario creado correctamente", link:'/dashboard', flag: true })
            }else{
                res.status(400).render('message',{ type: "Error: ", message: "No se puede crear el usuario, inténtelo más tarde.", link: '/', flag: true }) 
            } */
        } catch (err) {
            console.log(err)
           /*  res.status(500).render('message',{ type: "Error: ", message: "Falla la creacion del usuario", link: '/', flag: true })  */
        } finally {
            if (conn) return conn.end();
        }
    }
}