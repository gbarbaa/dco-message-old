var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var disclaimerscSubSchema = Schema({
  disclaimer: String
},{ _id : false });

var dcocSubSchema = Schema({
  size: String,
  placementid: {
    type: String,
    unique: true,
    required: true
  },
  offerheadline1: String,
  vehiclename1: String,
  ctalabel1: String,
  ctaurl1: String,
  disclosurelabel1: String,
  logo1: String,
  vehicleimage1: String,
  offerheadline2: String,
  vehiclename2: String,
  ctalabel2: String,
  ctaurl2: String,
  disclosurelabel2: String,
  logo2: String,
  vehicleimage2: String,
  offerheadline3: String,
  vehiclename3: String,
  ctalabel3: String,
  ctaurl3: String,
  disclosurelabel3: String,
  logo3: String,
  vehicleimage3: String,
  disclosurecopy1: String,
  disclosurecopy2: String,
  disclosurecopy3: String,
  backgroundimage: String,
  backgroundurl: String
},{ _id : false });

var DcoSchema = new Schema({
    userid: String,
    make: String,
    model: String,
    year: String,
    dealerid: String,
    dealername: String,
    dealerurl: String,
    pacode: String,
    postalcode: String,
    offers : [dcocSubSchema],
    updated_date: { type: Date, default: Date.now },
    publisher: String
  });

  module.exports = mongoose.model('Dcome', DcoSchema);
