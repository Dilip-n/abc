// const environment = process.env.NODE_ENV; // environment
// var config = require("../../.env")[environment];
const bcrypt = require("bcrypt");
const logger = require("../handlers/logHandlers");
var crypto = require("crypto");

module.exports = {
  passwordDecryption: async (ciphertext) => {
    try {
      const algorithm = "aes-192-cbc";
      const password = 'thisissecrate';

      const key = crypto.scryptSync(password, "salt", 24);

      const iv = Buffer.alloc(16, 0); // Initialization vector.

      const decipher = crypto.createDecipheriv(algorithm, key, iv);

      let decrypted = decipher.update(ciphertext, "hex", "utf8");
      decrypted += decipher.final("utf8");
      console.log(decrypted);
      return decrypted;
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      let result = {};
      logger.error("Password decryption error : ", err);
      result.status = 500;
      result.data = err;
      return result;
    }
  },
};
