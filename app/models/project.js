const mongoose = require("mongoose");

// schema maps to a collection
const Schema = mongoose.Schema;

//project experience information

const projectExperience = mongoose.Schema({
  projectName : {
    type: String,
    // required: true,
    trim: true,
  },

  cleintCompanyName : {
    type: String,
    // required: true,
    trim: true,
  },

  city : {
    type: String,
    // required: true,
    trim: true,
  },

  projectStartDate : {
    type: String,
    // required: true,
    trim: true,
  },

  projectEndDate : {
    type: String,
    // required: true,
    trim: true,
  },

  description : {
    type: String,
    // required: true,
    trim: true,
  },
})

const ModelSchema = new Schema({
  experience : [projectExperience], 

  GSTN: {
    type: String,
    // required: true,
    trim: true,
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

module.exports.Model = mongoose.model("Projects", ModelSchema);



