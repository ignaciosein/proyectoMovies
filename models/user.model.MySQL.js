const mariadb = require('mariadb');
// Conexión
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database: 'movieproject', 
    connectionLimit: 5}
);

const userMySQL = {
    createUser : async(data) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("INSERT INTO users value (?,?,?,?,?)")
            result = await conn.query(sqlQuery,data);
            /* console.log('result',result); */
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
            console.log(err)
        } finally {
            if (conn) conn.end();
        }
        return result
    },
    existUser : async (email) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("select email from users where email=?")
            result = await conn.query(sqlQuery,email);
            result = result[0]
            /* console.log('resultUserExiste',result); */
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
            /* console.log(result) */
        } finally {
            if (conn) conn.end();
        }
        return result
    },
    getRowUser: async(email)=>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("select * from users where email=?")
            result = await conn.query(sqlQuery,email);
            result = result[0]
            /* console.log('resultUserExiste',result); */
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
            /* console.log(result) */
        } finally {
            if (conn) conn.end();
        }
        return result      
    },
    insertNewToken: async(email,token)=>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("update users set token=? where email=?")
            result = await conn.query(sqlQuery,[token,email]);
            /* console.log(result) */
        } catch (err) {
            console.log(err)
            result = {codeError: err.code, numError: err.errno}
            /* console.log(result)  */
        } finally {
            if (conn) conn.end();
        }
        return result  
    }
}

module.exports = userMySQL