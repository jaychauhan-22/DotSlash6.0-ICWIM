const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
{
    username:String,
    email: { type: String, unique: true },
    password: String,
    mobileno: {type:Number, unique:true},
    dob: String,
    gender:String,
    aadharcard:String
},
{
    collection: "users",
}
);

const user = mongoose.model("UserInfo", UserDetailsScehma);
module.exports={user}