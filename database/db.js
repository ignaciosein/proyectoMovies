const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database:'movieProject', 
    connectionLimit: 5
});

/* async function sendMessage(message) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("INSERT INTO bbdd.mensajes value (?, ?)",[6,message]);
      console.log(res); 
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  } */

/*   let getConnection = async(cb) =>{
      await pool.getConnection((err, connection)=>{
          if(err){
              return cb(err)
          }
          cb(null,connection)
      })
  } */
/* 
let conexion = async () =>{
  conn = await pool.getConnection();
  return conn
}

module.exports = conexion */