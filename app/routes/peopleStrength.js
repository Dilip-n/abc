const peopleStrengthController = require("../controllers/peopleStrength");
const utils = require("../utils");
//  const tokenValidation = utils.VALIDATE_TOKEN.validateToken;


module.exports = (router) => {
  router.route("/creatPeopleStrength").post(peopleStrengthController.createProject); //userSignin

//   router.route("/users/login").post(projectController.login); // userLogin

  

 
}