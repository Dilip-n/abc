"use strict";
const model_links = require("./../models");
const model_wrapper = require("./curdOperations");
const generateUserToken = require("./generateUserToken");
const validateToken = require("./validateToken");
const passwordEncryption = require("./passwordEncryption");
const passwordDecryption = require("./passwordDecryption");
//const fileUpload = require("./fileUpload");


module.exports = {
  MODEL: model_links,
  MODEL_ORM: model_wrapper,
  GENERATE_TOKEN: generateUserToken,
   VALIDATE_TOKEN: validateToken,
  ENCRYPTION: passwordEncryption,
  DECRYPTION: passwordDecryption,
  //FILE_UPLOAD: fileUpload,
};
