const userDetailsController = require("../controllers/users_details");
const utils = require("../utils");
// const tokenValidation = utils.VALIDATE_TOKEN.validateToken;


module.exports = (router) => {
  router.route("/users/signup").post(userDetailsController.signup);

  router.route("/users/login").post(userDetailsController.login);
}