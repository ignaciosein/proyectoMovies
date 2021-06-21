const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database: 'movieproject', 
    connectionLimit: 5}
);

const muserGoogle = {
    searchOneUser: async (user) => {
        let conn;
        let result;
        try {
          conn = await pool.getConnection();
          let sql_query = "select count(*) as num from users where email = ?"
          result = await conn.query(sql_query,user);
          /* console.log(result);  */
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
        return result
    },
    createUser : async(data) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("INSERT INTO users value (?,?,?,?,?)")
            result = await conn.query(sqlQuery,data);
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
            console.log(err)
        } finally {
            if (conn) conn.end();
        }
        return result
    }
}
module.exports = muserGoogle;