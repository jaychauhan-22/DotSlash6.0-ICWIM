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

    "mongodb+srv://Madhav-Dhokiya:Syntax-Error@HealthifyDB.pylhh5w.mongodb.net/?retryWrites=true&w=majority",
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
const { ration } = require("./models/ration.js")
const {user} = require("./models/user.js")
/*--------------------------------------------------------------------------*/



/*------------------------------API------------------------------------*/
function mongoConnected() {
    console.log("Database Connected");


    /*Ration:- Post*/
    app.post("/ration", async (req, res) => {
        const { totalUser, userids } = req.body;

        try {
            //console.log(Object.keys(userids).length);
            if (totalUser == Object.keys(userids).length) {
                await ration.create({
                    totalUser,
                    userids
                });
                res.send({ status: "ok" });
            }
            else {
                res.send({ status: "Users and userids are not matching" });
            }
        }
        catch (error) {
            res.send({ status: "Data not inserted" });
        }
    });

    /*Fetch Ration */
    app.get("/ration-all", (req, res) => {
        ration.find({}, { _id: 1, __v: 0 }, (err, users) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            if (users && users.length == 0) {
                return res.status(400).json({ error: "Data not found" })
            }
            return res.status(200).json(users)
        });
    });

    /*Fetch Ration specific */
    app.get("/ration/:id", (req, res) => {
        ration.find({ _id: req.params.id }, (err, users) => {
            if (err) {
                return res.status(400).json({ status: "error", error: err });
            }
            if (users && users.length == 0) {
                return res.status(400).json({ error: "Data not found" })
            }
            return res.status(200).json(users[0]);
        });
    });

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
}
/*----------------------------------------------------------------------*/
app.listen(port, function (err) {
    if (err) console.log("Error in server setup");
    else console.log("Server listening on Port", port);
});