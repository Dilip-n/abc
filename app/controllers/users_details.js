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
      phone: Joi.string(),
      GSTN: Joi.string(),
    });

    const checkDetails = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      GSTN: req.body.GSTN,
    };

    Joi.validate(checkDetails, schema, async (err, value) => {
      console.log("inside");
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
              phone: req.body.phone,
              GSTN: req.body.GSTN,
              password: enpass,
            };
            let user = await utils.MODEL_ORM.create(utils.MODEL.users, query2);
            const payload = {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              GSTN: user.GSTN,
            };

            const token = await utils.GENERATE_TOKEN.generateUserToken(payload);

            let userData = {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              GSTN: user.GSTN,
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
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().required(),
      phone: Joi.string(),
    });
    
    const checkDetails = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
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
        const { phone, email, password } = req.body;

        console.log("req.body ", req.body);

        try {

          if(phone){
            let query = {
              phone: phone,
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
                  phone: user.phone,
                  GSTN: user.GSTN,
                };
                const token = await utils.GENERATE_TOKEN.generateUserToken(
                  payload
                );
  
                const userData = {
                  user_id: user._id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  GSTN: user.GSTN,
                };
                if (userData) {
                  logger.info("User Login with phone success");
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
                  msg: `User not found with this phone `,
                  results: null,
                },
              });
            }
          }else if(email){
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
                  phone: user.phone,
                  GSTN: user.GSTN,
                };
                const token = await utils.GENERATE_TOKEN.generateUserToken(
                  payload
                );
  
                var userData = {
                  user_id: user._id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  GSTN: user.GSTN,
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

  getUserDetails: async (req, res) => {
    const payload = req.decoded;
    console.log("user is", payload);

    let query = {
      _id: payload._id,
    };

    console.log("query is", query);
    try {
      let user = await utils.MODEL_ORM.findOne(utils.MODEL.users, query);
      console.log("user is", user);
      if (user) {
        logger.info("Single user details found");
        return res.status(200).json({
          success: true,
          data: {
            msg: `Records found`,
            results: user,
          },
        });
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
};
