const jwt = require("jsonwebtoken");
// const environment = process.env.NODE_ENV; // environment
// var stage = require("../../.env")[environment];

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    // console.log(authorizationHeaader)
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      // console.log("token",token)

      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        // result = jwt.verify(token, stage.JWT_SECRET);
        result = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("token",token)
        // Let's pass back the decoded token to the request object
        req.decoded = result;
 
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        res.status(403).json({
          success: false,
          data: {
            results: null,
            msg: "Authentication error. Invalid Token"
          }
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        data: {
          msg: `Authentication error. Token required.`,
          results: null,
        },
      });
    }
  }
};
