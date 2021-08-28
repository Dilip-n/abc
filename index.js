require("dotenv").config(); // Sets up dotenv as soon as our application starts

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const logger = require("./app/handlers/logHandlers");
// const a = require("./config/dev.env")
const port = process.env.PORT
const connUri = process.env.DBURI


// console.log(a.SECRATE)

const router = express.Router();


//DB connection

mongoose.connect(
  `${connUri}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("<----------------------------------------------->");
      logger.error("DB filed to connect : " + err.message);
      console.log("<----------------------------------------------->");
      return;
    } else {
      logger.info(`DB Connected successfully : ${connUri}`);
      console.log("<----------------------------------------------->");
    }
  }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const routes = require("./app/routes/index.js");

app.use("/api/v1", routes(router));

//Server setup

app.listen(port, () => {
    console.log("<----------------------------------------------->");
    logger.info("Server now running in " + " mode ");
    console.log("<----------------------------------------------->");
    logger.info("Server lististing at port : " + port);
    console.log("<----------------------------------------------->");
    console.log("Server Conneted to DB = " + connUri);
  });

  module.exports = app;
