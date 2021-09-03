const companyDetailsController = require("../controllers/company_details");
const utils = require("../utils");
//  const tokenValidation = utils.VALIDATE_TOKEN.validateToken;


module.exports = (router) => {
//   router.route("/users/signup").post(userDetailsController.signup);
router.route("/company/create").post(companyDetailsController.createCompany)

router.route("/company/getCompanyDetails/:ID").get(companyDetailsController.getCompany)

router.route("/company/getAllCompanyDetails").get(companyDetailsController.getAllCompany)

router.route("/company/updateCompanyDetails/:ID").put(companyDetailsController.updateCompany)

router.route("/company/deleteCompanyDetails/:ID").delete(companyDetailsController.deleteCompany)




}