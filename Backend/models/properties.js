const mongoose = require("mongoose");

const PropertyDetailsSchema = new mongoose.Schema(
{
    propertyid:String,
    ownerid:String,
    address:String,
    wardno:Number
},
{
    collection: "properties",
}
);

const property = mongoose.model("PropertyInfo", PropertyDetailsSchema);
module.exports={property}