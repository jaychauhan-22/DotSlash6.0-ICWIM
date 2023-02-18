const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
{
    userid:String,
    username:String,
    propertyid:String,
    wasteDepositDate: String,
    kilos:Number,
    ttlpt:Number,
    pointsperkg:Number
},
{
    collection: "wastehistory",
}
);

const waste = mongoose.model("WasteInfo", wasteSchema);
module.exports={waste}