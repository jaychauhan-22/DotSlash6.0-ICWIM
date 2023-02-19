/*--------------------------LIBRARY-----------------------------------*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
/*---------------------------------------------------------------------*/


/*-----------------------------SERVER CONFIG----------------------------------------*/
const port = 8000
/*---------------------------------------------------------------------*/


/*---------------------------MONGO CONFIG--------------------------------------*/
mongoose.connect(

    "mongodb+srv://auth:ftTZkR1zL1G5hbkJ@icwim.8bn4u1b.mongodb.net/icwim",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", mongoConnected);
/*-----------------------------------------------------------------------*/


/*--------------------------------MODELS--------------------------------------*/
const { user } = require("./models/user.js")
const { property } = require("./models/properties.js")
const { waste } = require("./models/wastehistory.js")
/*--------------------------------------------------------------------------*/



/*------------------------------API------------------------------------*/
function mongoConnected() {
    console.log("Database Connected");

    /*Fetch Users*/
    app.get("/users", (req, res) => {
        user.find({}, { _id: 1, __v: 0 }, (err, users) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.status(200).json(users)
        });
    });

    /*Get Specific User*/
    app.get("/user/singleUser/:id", (req, res) => {
        user.find({ _id: req.params.id }, (err, users) => {
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            return res.status(200).json(users[0]);
        });
    });
    /*Get Specific User by Email*/
    app.get("/user/singleUserbyEmail/:email", (req, res) => {
        user.findOne({ email: req.params.email }, (err, users) => {
            
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (users) {
                return res.status(200).json(users);
            }
            else{
                return res.json({ status: "error", error: "User not found" });
            
            }
        });
    });

    /* Login Authentication */
    app.post("/user/login-user", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        user.findOne({ email }, (err, user) => {
            if (err) {
                return res.json({ status: "error", error: err });
            }
            if (!user) {
                return res.json({ status: "error", error: "User not found" });
            }
            if (password === user.password) {
                if (res.status(201)) {
                    return res.json({
                        status: "ok",
                        data: {
                            token: user._id,
                            name: user.username,
                        },
                    });
                } else {
                    return res.json({ status: "error" });
                }
            }
            res.json({ status: "error", error: "Invalid Password*" });
        });
    });

    /*Login User*/
    app.post("/login-user", async (req, res) => {
        try {
            const { email, password } = req.body;

            const userCheck = await user.findOne({ email, password });
            if (!userCheck) {
                return res.json({ error: "User Not found*" });
            }
            res.json({ status: "Login Successful" });
        }
        catch (error) {
            console.log(error);
        }
    });

    /*Register User*/
    app.post("/registerUser", async (req, res) => {
        const { username, email, password, mobileno, dob, gender, aadharcard } = req.body;

        try {
            const oldUser = await user.findOne({ email });

            if (oldUser) {
                return res.json({ error: "User Exists" });
            }
            await user.create({
                username,
                email,
                password,
                mobileno,
                dob,
                gender,
                aadharcard
            });
            res.send({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.send({ status: "error" });
        }
    });

    /*Update User*/
    app.put("/user/:email", async (req, res) => {
        const { username, email, password, mobileno, dob, gender, aadharcard } = req.body;
        //console.log({ username, email, password, mobileno, dob, gender, aadharcard });
        try {
            const result = await user.updateOne(
                { email: req.params.email },
                { $set: { username: username, email: email, password: password, mobileno: mobileno, dob: dob, gender: gender, aadharcard: aadharcard } }
            );
            return res.json({ status: "User updated", data: result });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", error: error });
        }
    });

    /*Delete User*/
    app.delete("/user/delete/:email", (req, res) => {
        user.deleteOne({ email: req.params.email }, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({ result });
        });
    });

    /*Property Insert*/
    app.post("/property", async (req, res) => {
        const { propertyid, ownerid, address, wardno } = req.body;

        try {
            const propertyCheck = await property.findOne({ propertyid });

            if (propertyCheck) {
                return res.json({ error: "Exists" });
            }
            await property.create({
                propertyid,
                ownerid,
                address,
                wardno
            });
            res.send({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.send({ status: "error" });
        }
    });

    /*Property Fetch All*/
    app.get("/property-all", (req, res) => {
        property.find({}, { _id: 0, __v: 0 }, (err, emps) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.status(200).json(emps)
        });
    });

    /*Property Fetch Specific*/
    app.get("/property/:id", (req, res) => {
        property.findOne({ propertyid: req.params.id }, (err, p) => {
            
            if (err) {
                return res.status(400).json({ status: "error", error: error });
            }
            if(p)
                return res.status(200).json(p);
            else
                return res.json({ status: "error", error: "Property not found" });
        });
    });

    /*Property Fetch based on ward no*/
    app.get("/property/ward/:wardno", (req, res) => {
        property.find({ wardno: req.params.wardno }, (err, p) => {
            
            if (err) {
                return res.status(400).json({ status: "error", error: error });
            }
            if(p)
                return res.status(200).json(p);
            else
                return res.json({ status: "error", error: "Data not found" });
        });
    });

    /*Property Update*/
    app.put("/property/update/:id", async (req, res) => {
        const { propertyid, ownerid, address, wardno } = req.body;

        try {
            const result = await property.updateOne(
                { propertyid: req.params.id },
                { $set: { propertyid: propertyid, ownerid: ownerid, address: address, wardno: wardno } }
            );
            return res.json({ status: "Property details updated", data: result });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", error: error });
        }
    });

    /*Property Delete*/
    app.delete("/property/delete/:id", (req, res) => {
        property.deleteOne({ propertyid: req.params.id }, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({ result });
        });
    });

    /*Waste History Insert */
    app.post("/wasteHistory", async (req, res) => {
        const { userid, username, propertyid, wasteDepositDate, kilos, pointsperkg } = req.body;
        var ttlpt = kilos * pointsperkg;

        try {
            await waste.create({
                userid,
                username,
                propertyid,
                wasteDepositDate,
                kilos,
                ttlpt,
                pointsperkg
            });
            res.send({ status: "ok" });
        } catch (error) {
            console.log(error);
            res.send({ status: "error" });
        }
    });

    /*Waste History Fetch */
    app.get("/waste-all", (req, res) => {
        waste.find({}, { _id: 0, __v: 0 }, (err, emps) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.status(200).json(emps)
        });
    });

    /*Waste History Fetch Sorted Based on Points*/
    app.get("/waste-sort", (req, res) => {
        waste.find({}, { _id: 0, __v: 0 }, (err, emps) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.status(200).json(emps)
        }).sort({ttlpt:-1});
    });

    /*Waste History Specific*/
    app.get("/waste/:userid/:date", (req, res) => {
        // console.log(userid,date);
        waste.find({ userid: req.params.userid,wasteDepositDate: req.params.date }, (err, p) => {
            if (!p[0]) {
                return res.status(400).json({ status:"not found", error: err });
            }
            return res.status(200).json(p[0]);
        });
    });
    app.get("/waste/:userid/:startdate/:enddate", (req, res) => {
        // console.log(userid,date);
        waste.find({ userid: req.params.userid,wasteDepositDate: {$gte: ISODate(req.params.startdate),$lt: ISODate(req.params.enddate)}}, (err, p) => {
            if (!p[0]) {
                return res.status(400).json({ status:"not found", error: err });
            }
            return res.status(200).json(p[0]);
        });
    });

    /*Waste History Update */
    app.put("/waste/update/:id", async (req, res) => {
        const { userid,username, propertyid, wasteDepositDate, kilos, ttlpt, pointsperkg } = req.body;

        try {
            const result = await waste.updateOne(
                { userid: req.params.id },
                { $set: { userid: userid,username:username, propertyid: propertyid, wasteDepositDate: wasteDepositDate, kilos: kilos, ttlpt: ttlpt, pointsperkg: pointsperkg } }
            );
            return res.json({ status: "Updated", data: result });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", error: error });
        }
    });

    /*Waste History Delete*/
    app.delete("/waste/delete/:id", (req, res) => {
        waste.deleteOne({ userid: req.params.id }, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({ result });
        });
    }); 


}
/*----------------------------------------------------------------------*/
app.listen(port, function (err) {
    if (err) console.log("Error in server setup");
    else console.log("Server listening on Port", port);
});