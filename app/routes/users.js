const userDetailsController = require("../controllers/users_details");
const utils = require("../utils");
 const tokenValidation = utils.VALIDATE_TOKEN.validateToken;


module.exports = (router) => {
  router.route("/users/signup").post(userDetailsController.signup); //userSignin

  router.route("/users/login").post(userDetailsController.login); // userLogin

  router
  .route("/users/get-companydetails")
  .get(tokenValidation, userDetailsController.getUserCompanyDetails); // getuserCompanyDetails

  router
  .route("/userUploadImage/:ID")
  .post(utils.FILE_UPLOAD.upload_File, userDetailsController.uploadImage);

 
}