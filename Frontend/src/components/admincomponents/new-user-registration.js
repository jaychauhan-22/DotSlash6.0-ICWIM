import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './admin-navbar';
const NewUserRegistration = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem("admintoken") == null)
            navigate("/");
    }, []);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilenumber, setmobilenumber] = useState();
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [aadharcard, setAadharcard] = useState("");
    const [statusError, setStatusError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/registerUser/`, {
            method: "post",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                mobileno: mobilenumber,
                dob: dob,
                gender: gender,
                aadharcard: aadharcard
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "ok") {
                    setStatusError("");
                    alert("User Account Createed Successfully..");
                    navigate(`/admin-home`);
                } else {
                    setStatusError("An Error Occurred Please Try Again Later..");
                }
            });

    }
    const logoutUser = (e) => {
        window.localStorage.removeItem("token");
        navigate("/");

    }
    return (
        <div>
            <AdminNavbar />
            <div className="container rounded bg-white my-4">
                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="200px" src="/static/img/userprofile.png" />
                            <br />
                            <span className="font-weight-bold h2">New User Registration</span>
                            <span className="text-black-50 h5">Enter the given Details</span>
                        </div>
                    </div>
                    <div className="col-md-8 border-right">
                        <form onSubmit={handleSubmit}>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                </div>
                                <div className="row">
                                    <div className="form-floating mb-3 col">
                                        <input required type="text" id="username" className="form-control x-3" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} />
                                        <label className="form-label mx-2" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-floating mb-3 col">
                                        <input required type="password" id="password" className="form-control form-control-lg " placeholder='Password'  onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label  mx-2" htmlFor="password">Password</label>
                                    </div>
                                </div>



                                <div className="form-floating mb-3">
                                    <input required type="number" id="mobilenumber" className="form-control form-control-lg" placeholder='mobilenumber' onChange={(e) => setmobilenumber(e.target.value)} />
                                    <label className="form-label" htmlFor="mobilenumber">Mobile Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" id="email" className="form-control form-control-lg" required placeholder='Please Enter Email' onChange={(e)=>setEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input required type="date" id="dob" className="form-control form-control-lg" placeholder='dob' onChange={(e)=>{setDob(e.target.value)}} />
                                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input required type="number" id="adharcard" className="form-control form-control-lg" placeholder='adharcard' onChange={(e)=>{setAadharcard(e.target.value)}} />
                                    <label className="form-label" htmlFor="Gender">Aadhar Card</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <select required className="form-select form-control" aria-label="Default select example" onChange={(e)=>{setGender(e.target.value)}}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <label className="form-label" htmlFor="Gender">Gender</label>
                                </div>
                                <br />

                                <div className="mt-4 text-center">
                                    <button className="mx-4 px-4 py-2  btn btn-primary profile-button" type="submit" name="submitbutton" >Create User Account </button>
                                </div>
                                <div className="my-2">
                                    {statusError !== "" && (
                                        <div>
                                            <p className="text-danger fs-5">{statusError}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default NewUserRegistration;
