const jwt = require("jsonwebtoken");
// const environment = process.env.NODE_ENV; // environment
// var stage = require("../../.env")[environment];

module.exports = {
  generateUserToken: (payload) => {
    try {
      console.log(payload)
      const token = jwt.sign(payload, 'thisissecrate', {
        expiresIn: 60 * 60 * 24 * 365 * 25,
      });
      return token;
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      console.log(err);
      return err;
 
    }
  },
};
