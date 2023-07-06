const express = require("express"); //llamamos a Express
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express(cors());
app.use(fileUpload());
require("dotenv").config();
const port = process.env.PORT; // establecemos nuestro puerto
const router = require("./app/routes");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", router);

//arrancamos el servidor
let servidor = app.listen(port);

servidor.timeout = 10 * 60 * 1000;
console.log("API escuchando en el puerto " + port);
