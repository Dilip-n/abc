const utils = require("../utils");
const logger = require("../handlers/logHandlers");
const Joi = require("joi");

module.exports = {
    //===========SignUp=================
    signup: async (req, res) => {
      //validation

        const schema = Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
        skills: Joi.array(),
      });

     
  
      const checkDetails = {
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
      };
     

      Joi.validate(checkDetails, schema, async (err, value) => {
      console.log("inside") 
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
            let query = { email: req.body.email };
            let userEmail = await utils.MODEL_ORM.findOne(
              utils.MODEL.users,
              query
            );
            if (userEmail != null) {
              return res.status(409).json({
                success: false,
                data: {
                  msg: `Email already exists`,
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
    login: async (req, res) => {
      //validation
      const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().required(),
      });
  
      const checkDetails = {
        email: req.body.email,
        password: req.body.password,
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
          const { email, password } = req.body;
  
          console.log("req.body ", req.body);
  
          try {
            let query = {
              email: email,
            };
            let user = await utils.MODEL_ORM.findOne(utils.MODEL.users, query);
            //console.log(" --- user", user);
            if (user != null) {
              let ciphertext = user.password; //hashed password from database
              let decrypted = await utils.DECRYPTION.passwordDecryption(
                ciphertext
              );
              console.log(decrypted);
              // Check user password
              if (decrypted == req.body.password) {
                // Create a token
                const payload = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  skills: user.skills,
                };
                const token = await utils.GENERATE_TOKEN.generateUserToken(
                  payload
                );
  
                var userData = {
                  user_id: user._id,
                  name: user.name,
                  email: user.email,
                  skills: user.skills,
                };
                if (userData) {
                  logger.info("User Login with email success");
                  let result = {};
                  result.token = token;
                  result.data = userData;
  
                  return res.status(200).json({
                    success: true,
                    data: {
                      msg: `Login success`,
                      results: result,
                    },
                  });
                } else {
                  res.status(200).json({
                    success: false,
                    data: {
                      results: null,
                      msg: "You are blocked",
                    },
                  });
                }
              } else {
                return res.status(406).json({
                  success: false,
                  data: {
                    msg: `Password not matched`,
                    results: null,
                  },
                });
              }
            } else {
              return res.status(404).json({
                success: false,
                data: {
                  msg: `User not found with this email `,
                  results: null,
                },
              });
            }
          } catch (e) {
            logger.error("Login error : ", e.message);
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
}