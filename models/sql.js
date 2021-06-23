const pool = require('../database/mysql.cnx')
let sql = {
  checkFavMovies: async (movieName,email) => {
     
    let conn;
    try {

      let comprobarDatoExistente =
      "SELECT count(*) as contador FROM `favmovies` WHERE `idmovie`= ? and `emailuser`= ?";

    conn = await pool.getConnection();
    result = await  conn.query(comprobarDatoExistente, [movieName, email]);
    

    console.log("Esto pertenece a ",result)

    } catch (err) {
      result = err;
    } finally {
      if (conn) conn.end();
    }
    return result;

},
  addFavMovie: async (movieName, email) => {
     
            let conn;
            try {
  
              conn = await pool.getConnection();
              let sql_query = "INSERT INTO favmovies value (?,?)";
              result= await conn.query(sql_query, [movieName, email]);
         

             console.log(" Se añado la pelicula a la base de atos");  
            } catch (err) {
              result = err;
            } finally {
              if (conn) conn.end();
            }
            return result;
     
  },

  allFavMovies: async (email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " SELECT idmovie FROM favmovies  WHERE emailuser  = ? "; ///
      result = await conn.query(sql_query, email);

      /*       console.log(sql_query) */
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  allFavMoviesApi: async (email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = "  SELECT * FROM favmovies WHERE idmovie LIKE '%tt%' and `emailuser` = ? "; ///
      result = await conn.query(sql_query, email);

      /*       console.log(sql_query) */
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  checkLocalFavMovies: async (email ) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " SELECT * FROM favmovies WHERE idmovie NOT LIKE '%tt%' and `emailuser` = ? "; ///
      result = await conn.query(sql_query,email );

      /*       console.log(sql_query) */
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  delFavMovies: async (idMovie,email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " DELETE FROM `favmovies` WHERE idmovie = ? and `emailuser` = ?"; ///
      result = await conn.query(sql_query, [idMovie,email]);

      

      /*       console.log(sql_query) */
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
};

module.exports = sql;

/* 
async function getAll() {
    let conn;
    try {
      conn = await pool.getConnection(); */
/*  const rows = await conn.query("SELECT 1 as val"); */
/*     console.log(rows); */ //[ {val: 1}, meta: ... ]
/*  const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]); */
/* const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]); */
/* const res = await conn.query("INSERT INTO mensajes value (5, 'primer mensaje')"); */
/*     let sql_query= "SELECT * FROM favmovies"
      const res = await conn.query(sql_query);
      console.log(res); */ // { affectedRows: 1, insertId: 1, warningStatus: 0 }

/*   } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
    */

/*   getAll()  */

/* 
async function searchEntries(email){


  let conn;
  try {
    conn = await pool.getConnection();
     let sql_query= "SELECT entradas_blog.Titulo, Autores.Email FROM entradas_blog INNER JOIN Autores ON entradas_blog.ID_autor = Autores.ID_autor WHERE Autores.Email=?" /// 
    const res = await conn.query(sql_query,[email]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
} */

/* async function createEntry(datos,email){

 
  let conn;
  try {
    conn = await pool.getConnection();
     let sql_query="INSERT INTO `entradas_blog`( `Titulo`, `Contenido`, `Tematica`,`ID_autor`) VALUES (?,?,?,(SELECT `ID_autor` FROM `autores` WHERE `Email`=?))"
    const res = await conn.query(sql_query,[...datos,email]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
} */

/* let datos2 = ["Es hora de comer","Nacho ha ganado una hamburguesa","food"]

createEntry(datos2,"juanadearco@gmail.co")
 */

/* searchEntries("juanadearco@gmail.co"); */

/* asyncFunction();   */
