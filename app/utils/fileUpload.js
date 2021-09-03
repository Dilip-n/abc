const multer = require('multer');
var crypto = require('crypto');
var path = require('path');


var fileStorage = multer.diskStorage({ //multers disk storage settings
  destination: function(req, file, cb) {
      cb(null, './Uploads')
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + "_" + "_" + Date.now() + "_" + file.originalname);
  }
});


module.exports.upload_File = multer({ //multer settings
  storage: fileStorage,
  fileFilter: function(req, file, callback) { //file filter
      if (['jpg'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
  }
}).single('file');
