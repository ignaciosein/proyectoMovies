require("dotenv").config();
const jwt = require("jsonwebtoken");
const Movies = require("../models/schemas");
let bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  database: "movieproject",
  connectionLimit: 5,
});

const usurioDB = {
  name: "Luis",
  password: "1234",
  rol: "user",
};

const logica = {
  cryptoW: (word) => {
    return bcrypt.hashSync(word, salt);
  },
  validateUser: (data) => {
    return data.user == usurioDB.name && data.password == usurioDB.password;
  },
  getRolUser: (data) => {
    return usurioDB.rol;
  },
  generateToken: (email, admin) => {
    let tkn = jwt.sign({ email: email, admin: admin }, process.env.SECRET, {
      expiresIn: "10h",
    });
    return tkn;
  },
  getUser: (data) => {
    return false;
  },
  loadlLocalMovies: async () => {
    let resultM = await Movies.find();
    return resultM;
  },
  findOneLocalMovies: async (id) => {
    let resultOne = await Movies.find({ IdMovie: `${id}` });
    return resultOne;
  },
};

module.exports = logica;
