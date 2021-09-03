const projectController = require("../controllers/project");
const utils = require("../utils");
//  const tokenValidation = utils.VALIDATE_TOKEN.validateToken;


module.exports = (router) => {
  router.route("/creatProject").post(projectController.createProject); //userSignin

//   router.route("/users/login").post(projectController.login); // userLogin

  

 
}