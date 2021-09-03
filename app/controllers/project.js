const utils = require("../utils");
const logger = require("../handlers/logHandlers");
const Joi = require("joi");

module.exports = {
    //===========SignUp=================
   
    createProject: async (req, res) => {
      
      //validation
    
        const schema = Joi.object().keys({
            
          experience : Joi.array().items({
            projectName : Joi.string(),
            cleintCompanyName : Joi.string(),
            city : Joi.string(),
            projectStartDate : Joi.string(),
            projectEndDate : Joi.string(),
            description : Joi.string(),
          }),
          GSTN: Joi.string()
                
        });
    
        const checkDetails = {



          experience: req.body.experience,

          GSTN: req.body.GSTN,
          //   turnover: req.body.turnover,
          // website: req.body.website,
          // CIN: req.body.CIN,
          // GSTN: req.body.GSTN,
          // companyName: req.body.companyName,
          // totalManpower: req.body.totalManpower,
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
              let query = {  GSTN: req.body.GSTN };
              let project = await utils.MODEL_ORM.findOne(
                utils.MODEL.project,
                query
              );
              if (project != null) {
                return res.status(409).json({
                  success: false,
                  data: {
                    msg: `project already exists`,
                    results: null,
                  },
                });
              }  else{
                let query2 = {
                  experience: req.body.experience,

                   GSTN: req.body.GSTN,
                  
                  // turnover: req.body.turnover,
                  // website: req.body.website,
                  // CIN: req.body.CIN,
                  // GSTN: req.body.GSTN,
                  // companyName: req.body.companyName,
                  // totalManpower: req.body.totalManpower,
              };
              let project = await utils.MODEL_ORM.create(utils.MODEL.project, query2);
              if(project){           
                return res.status(201).json({
                  success: true,
                  data: {
                    msg: `project successfully created!`,
                    results: project,
                  },
                });
              }

              }         
                              
               
               console.log(project)
                
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
      }

      
  };