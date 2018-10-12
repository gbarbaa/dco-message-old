var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var disclaimerscSubSchema = Schema({
  disclaimer: String
},{ _id : false });

var dcocSubSchema = Schema({
  offerline1: String,
  vehiclename1: String,
  ctalabel1: String,
  ctaurl1: String,
  disclosurelabel1: String,
  logo1: String,
  vehicleimage1: String,
  offerline2: String,
  offerline3: String,
  VehicleName2: String,
  ctalabel2: String,
  ctaurl2: String,
  disclousurelabel2: String,
  logo2: String,
  vehicleimage2: String,
  vehiclename3: String,
  headline3: String,
  ctalabel3: String,
  ctaurl3: String,
  disclouserelabel3: String,
  logo3: String,
  vehicleimage3: String,
  disclosurecopy1: String,
  disclosureoffercopy2: String,
  disclosureoffercopy3: String,
  backgroundimage: String
},{ _id : false });

var DcoSchema = new Schema({
    placementid: {
      type: String,
      unique: true,
      required: true
    },
    make: String,
    model: String,
    year: String,
    dealerid: String,
    dealerName: String,
    pacode: String,
    postalCode: String,
    creativeid: String,
    campaignid: String,
    adid:String,
    campaignname: String,
    adname: String,
    campaignstartdate: Date,
    campaignexpdate: Date,
    adstartdate: Date,
    adexpdate: Date,
    campaignadtype: String,
    creativeobject: { data: Buffer, contentType: String },
    vehicleid: String,
    vehiclevin: String,
    color: String,
    trim: String,
    vehicleodometer: String,
    vehicletitle: String,
    vehicleprice: String,
    pacode: String,
    publisher: String,
    disclaimers : [disclaimerscSubSchema],
    frames : [dcocSubSchema],
    updated_date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Dcome', DcoSchema);
