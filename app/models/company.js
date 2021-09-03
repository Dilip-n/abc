const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  
  companyLogo: [],

  GSTN: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },

  CIN: {
    type: String,
    // required: true,
    trim: true,
    default: "",
  },

  website: {
    type: String,
    // required: true,
    default: "",
  },

  turnover: {
    type: String,
    // required: true,
    default: "",
  },

  totalManpower: {
    type: String,
    // required: true,
    default: "",
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

 
  delete userObject.__v;

  return userObject;
};

module.exports.Model = mongoose.model("Company", ModelSchema);
