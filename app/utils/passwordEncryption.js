// const environment = process.env.NODE_ENV; // environment
// var stage = require("../../.env")[environment];
const bcrypt = require("bcrypt");
const logger = require("../handlers/logHandlers");
var crypto = require("crypto");

module.exports = {
  passwordEncryption: async (password) => {
    let myPass = password;

    if (myPass) {
      try {
        const algorithm = "aes-192-cbc";
        // const secret = stage.secret;

        const key = crypto.scryptSync('thisissecrate', "salt", 24);

        const iv = Buffer.alloc(16, 0); // Initialization vector.

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(myPass, "utf8", "hex");
        encrypted += cipher.final("hex");

        return encrypted;
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        let result = {};
        logger.error("Password encryption error : ", err);

        result.status = 500;
        result.data = err;
        return result;
      }
    } else {
      let result = {
        data: `Please enter the password.`,
        status: 200,
      };
      return result;
    }
  },
};
