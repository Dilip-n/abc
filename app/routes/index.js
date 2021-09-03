const users = require("./users");
const companyDetails = require("./companyDetails");

const project = require("./project");
const peopleStrength = require("./peopleStrength")

module.exports = router => {
  users(router);
  companyDetails(router)
  project(router)
 peopleStrength(router)
  return router;
};
