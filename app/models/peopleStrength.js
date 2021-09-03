const number = require("joi/lib/types/number");
const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema({
  GSTN: {
    type: String,
    // required: true,
    trim: true,
  },

  fullTimeEmployees: {
    type: Number,
    // required: true,
    trim: true,
  },

  partTimeEmployees: {
    type: Number,
    // required: true,
    // trim: true,
  },

  totalEmployees:{
  type:Number
  },

  servecing: {
    type: [String],
    index: true,
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

module.exports.Model = mongoose.model("", ModelSchema);
