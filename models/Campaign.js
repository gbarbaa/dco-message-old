var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = mongoose.Schema({
  disclaimer: String
},{ _id : false });

var DcoSchema = new Schema({
    dealerid: String,
    dealerName: String,
    creativeid: String,
    campaignid: String,
    adid:String,
    campaignname: String,
    adname: String,
    campaignexpdate: Date,
    adexpdate: Date,
    campaignadtype: String,
    creativeobject: { data: Buffer, contentType: String },
    vehicleid: String,
    vehiclevin: String,
    make: String,
    model: String,
    year: String,
    color: String,
    trim: String,
    vehicleodometer: String,
    vehicletitle: String,
    vehicleprice: String,
    pacode: String,
    postalCode: String,
    publisher: String,
    disclaimers : [subSchema],
    updated_date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Campaign', DcoSchema);
