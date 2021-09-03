const utils = require("../utils");
const logger = require("../handlers/logHandlers");
const Joi = require("joi");

module.exports = {
    //===========SignUp=================
   
    createCompany: async (req, res) => {
      
      //validation
    
        const schema = Joi.object().keys({
            companyName: Joi.string(),
            GSTN: Joi.string(),
            CIN: Joi.string(),
            website: Joi.string(),
            turnover: Joi.string(),
            totalManpower: Joi.string(),
        });
    
        const checkDetails = {
            turnover: req.body.turnover,
          website: req.body.website,
          CIN: req.body.CIN,
          GSTN: req.body.GSTN,
          companyName: req.body.companyName,
          totalManpower: req.body.totalManpower,
        };
    
        Joi.validate(checkDetails, schema, async (err, value) => {
          
          if (err) {
            // send a 422 error response if validation fails
            console.log("error", err.details[0].message);
            return res.status(422).json({
              success: false,
              data: {
                msg: err.details[0].message,
                results: null,
              },
            });
          } else {
            try {
              let query = { companyName: req.body.companyName };
              let company = await utils.MODEL_ORM.findOne(
                utils.MODEL.company,
                query
              );
              if (company != null) {
                return res.status(409).json({
                  success: false,
                  data: {
                    msg: `company already exists`,
                    results: null,
                  },
                });
              }  else{
                let query2 = {
                  turnover: req.body.turnover,
                  website: req.body.website,
                  CIN: req.body.CIN,
                  GSTN: req.body.GSTN,
                  companyName: req.body.companyName,
                  totalManpower: req.body.totalManpower,
              };
              let user = await utils.MODEL_ORM.create(utils.MODEL.company, query2);
              if(user){           
                return res.status(201).json({
                  success: true,
                  data: {
                    msg: `company successfully created!`,
                    results: user,
                  },
                });
              }

              }         
                              
               
               console.log(user)
                
            } catch (e) {
              logger.error("creation error : ", e);
              return res.status(500).json({
                success: false,
                data: {
                  msg: e.message,
                  results: null,
                },
              });
            }
          }
        });
      },

      getCompany: async (req, res) => {
        // const payload = req.decoded;
        // console.log("user is", payload);
    
        let query = {
          _id: req.params.ID,
        };
    
        console.log("query is", query);
        try {
          let company = await utils.MODEL_ORM.findOne(utils.MODEL.company, query);
          
          let resp = {}
            resp.companyName = company.companyName,
           resp.GSTN = company.GSTN,
           resp.CIN = company.CIN,
           resp.website = company.website,
           resp.turnover = company.turnover,
           resp.totalManpower = company.totalManpower,
    
          console.log("user is", company);
          if (company) {
            logger.info("Single company details found");
            return res.status(200).json({
              success: true,
              data: {
                msg: `Records found`,
                results: resp,
              },
            });
          } else {
            return res.status(404).json({
              success: false,
              data: {
                msg: `company not found`,
                results: null,
              },
            });
          }
        } catch (e) {
          logger.error("Get user details error : ", e.message);
          return res.status(500).json({
            success: false,
            data: {
              msg: e.message,
              results: null,
            },
          });
        }
      },

      getAllCompany: async (req, res) => {

        try {
          let company = await utils.MODEL_ORM.findAll(utils.MODEL.company);
          console.log("user is", company);
          if (company) {
            logger.info("All user details found");
            return res.status(200).json({
              success: true,
              data: {
                msg: `Records found`,
                results: company,
              },
            });
          } else {
            return res.status(404).json({
              success: false,
              data: {
                msg: `Users not found`,
                results: null,
              },
            });
          }
        } catch (e) {
          logger.error("Get all company details error : ", e.message);
          return res.status(500).json({
            success: false,
            data: {
              msg: e.message,
              results: null,
            },
          });
        }
      },

      updateCompany : async (req,res)=>{
        
    //validation
    const schema = Joi.object().keys({
      companyName: Joi.string(),
      GSTN: Joi.string(),
      CIN: Joi.string(),
      website: Joi.string(),
      turnover: Joi.string(),
      totalManpower: Joi.string(),
  });
  const checkDetails = {
    turnover: req.body.turnover,
  website: req.body.website,
  CIN: req.body.CIN,
  GSTN: req.body.GSTN,
  companyName: req.body.companyName,
  totalManpower: req.body.totalManpower,
};
    Joi.validate(checkDetails, schema, async (err, value) => {
      if (err) {
        // send a 422 error response if validation fails
        console.log("error", err.details[0].message);
        return res.status(422).json({
          success: false,
          data: {
            msg: err.details[0].message,
            results: null,
          },
        });
      } else {
        try {
          

          let query1 = {
            _id: req.params.ID,
          };
          let formadata = {};
          formadata.turnover = req.body.turnover;
          formadata.website = req.body.website;
          formadata.CIN = req.body.CIN;
          formadata.companyName = req.body.companyName;
          formadata.totalManpower = req.body.totalManpower;
         

         

          let user = await utils.MODEL_ORM.findOne(utils.MODEL.company, query1);
          if (user) {
            let query2 = [
              {
                _id: req.params.ID,
              },
              {
                $set: formadata,
              },
              {
                w: 1,
              },
            ];

            let user = await utils.MODEL_ORM.update(utils.MODEL.company, query2);
            if (user.nModified) {
              logger.info(`company profile updated successfully`);
              return res.status(200).json({
                success: true,
                data: {
                  msg: `Updated`,
                  results: null,
                },
              });
            } else {
              logger.info(`company profile not updated successfully`);
              return res.status(424).json({
                success: false,
                data: {
                  msg: `Failed`,
                  results: null,
                },
              });
            }
          } else {
            return res.status(404).json({
              success: false,
              data: {
                msg: `User not found`,
                results: null,
              },
            });
          }
        } catch (e) {
          logger.error("Update error : ", e.message);
          return res.status(500).json({
            success: false,
            data: {
              msg: e.message,
              results: null,
            },
          });
        }
      }
    });
  
      },

      deleteCompany : async (req, res)=>{
        try {
          // let result = {};
          // const payload = req.decoded;
    
          let userQuery = {
            _id: req.params.ID,
          };
    
          //console.log("userQuery is", userQuery);
          let selected = "";
          let companyDetails = await utils.MODEL_ORM.findOne(
            utils.MODEL.company,
            userQuery,
            selected
          );
    
          if (companyDetails) {
           
               query1 = {
                _id: req.params.ID,
               }
                let deletingCompany = await utils.MODEL_ORM.delete(
                  utils.MODEL.company,
                  query1
                );
    
                if (deletingCompany != null) {
                  logger.info("company deleted successfully");
                  return res.status(201).json({
                    success: true,
                    data: {
                      msg: `company deleted successfully `,
                      results: deletingCompany,
                    },
                  });
                } else {
                  return res.status(404).json({
                    success: false,
                    data: {
                      msg: `company not deleted successfully`,
                      results: null,
                    },
                  });
                }
              } else {
                return res.status(424).json({
                  success: false,
                  data: {
                    msg: `company not found`,
                    results: null,
                  },
                });
              }
            } 
        catch (e) {
          let result = {};
          logger.error("company error : ", e);
          status = 500;
          result.status = status;
          result.data = e.message;
          res.status(status).send(result);
        }
      }
  };