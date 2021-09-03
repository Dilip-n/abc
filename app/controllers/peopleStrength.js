const utils = require("../utils");
const logger = require("../handlers/logHandlers");
const Joi = require("joi");

module.exports = {
    //===========SignUp=================
   
    createProject: async (req, res) => {
        //validation
        const schema = Joi.object().keys({
            GSTN: Joi.string(),
            fullTimeEmployees: Joi.number(),
            partTimeEmployees: Joi.number(),
            totalEmployees: Joi.number(),
            servecing : Joi.array(),
        });
    
        const checkDetails = {
            GSTN: req.body.GSTN,
            fullTimeEmployees:req.body.fullTimeEmployees,
            partTimeEmployees: req.body.partTimeEmployees,
            totalEmployees:req.body.totalEmployees,
            servecing : req.body.servecing,
       
       
            //   name: req.body.name,
        //  email: req.body.email,
        //   skills: req.body.skills,
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
              let query = { GSTN: req.body.GSTN };
              let peopleStrength = await utils.MODEL_ORM.findOne(
                utils.MODEL.peopleStrength,
                query
              );
              if (userEmail != null) {
                return res.status(409).json({
                  success: false,
                  data: {
                    msg: `peopleStrength already exists`,
                    results: null,
                  },
                });
              } else {
                console.log("inside");
                let enpass = await utils.ENCRYPTION.passwordEncryption(
                  req.body.password
                );
                console.log("enpass", enpass);
    
                let query2 = {
                  name: req.body.name,
                  email: req.body.email,
                  password: enpass,
                  skills: req.body.skills,
                };
                let user = await utils.MODEL_ORM.create(utils.MODEL.users, query2);
                const payload = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  skills: user.skills,
                };
    
                const token = await utils.GENERATE_TOKEN.generateUserToken(payload);
    
                let userData = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  skills: user.skills,
                };
                logger.info("User Signup success");
    
                let result = {};
                result.token = token;
                result.data = userData;
    
                return res.status(201).json({
                  success: true,
                  data: {
                    msg: `Registered successfully!`,
                    results: result,
                  },
                });
              }
            } catch (e) {
              logger.error("Signup error : ", e);
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
    

      
  };