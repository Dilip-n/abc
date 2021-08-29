const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    lowercase: true,
    unique: true
  },

  user_image: [],

  phone: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },
  GSTN: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },

  password:{
    type: String,
    required: true,
   
  }, 

  created_date: {
    type: Date,
    default: Date.now,
  },
});

//========Hiding important field and unwanted fields=======================

ModelSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

module.exports.Model = mongoose.model("Users", ModelSchema);
