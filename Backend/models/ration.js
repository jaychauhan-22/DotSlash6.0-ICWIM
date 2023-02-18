const mongoose = require("mongoose");

const rationDetailsSchema = new mongoose.Schema(
{
    totalUser:Number,
    userids: {type:JSON}
},
{
    collection: "ration",
}
);

const ration = mongoose.model("UserInfo", rationDetailsSchema);
module.exports={ration}