import AdminNavbar from './admin-navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AdminUserprofileUpdate = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem("admintoken") == null)
            navigate("/");
    }, []);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilenumber, setmobilenumber] = useState(0);
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [aadharcard, setAadharcard] = useState("");
    const [statusError, setStatusError] = useState("");

    const [useremailset, setuserEmailStatus] = useState("");
    const [finduseremail, setFindUserEmail] = useState("");
    useEffect(() => {
        

    }, []);
    const finduser = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:8000/user/singleUserbyEmail/${finduseremail}`, {
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status != "error") {
                    setuserEmailStatus("Found");
                    setUsername(data.username);
                    setEmail(data.email);
                    setDob(data.dob);
                    setGender(data.gender);
                    setPassword(data.password);
                    setmobilenumber(data.mobileno);
                    setAadharcard(data.aadharcard);

                } else {
                    setuserEmailStatus("Not Found");
                }
            });
        

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/user/${email}`, {
            method: "put",
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
                if (data.data.modifiedCount >= 1) {
                    setStatusError("");
                    alert("Profile Updated Successfully..");
                    navigate(`/user-profileupdate-byadmin`);
                } else {
                    setStatusError("An Error Occurred Please Try Again Later..");
                }
            });

    }
    return (
        <div>
            <AdminNavbar />

            <div className="container rounded bg-white my-4">
                <form class="d-flex justify-content-center py-3" onSubmit={finduser} role="search">
                    <input class="form-control me-2 w-25" type="search" required placeholder="Enter User's Email Address" aria-label="Search" onChange={(e)=>{setFindUserEmail(e.target.value)}} />
                    <button class="btn btn-warning px-5 py-2" type="submit">Search</button>
                </form>
                {useremailset == "Found" && (
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5" width="200px" src="/static/img/userprofile.png" />
                                <br />
                                <span className="font-weight-bold h2">Exising User Information</span>
                                <span className="text-black-50 h5">Update the Existing User Information</span>
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
                                            <input required type="text" id="username" value={username} className="form-control x-3" placeholder='Enter Username' disabled />
                                            <label className="form-label mx-2" htmlFor="username">Username</label>
                                        </div>
                                        <div className="form-floating mb-3 col">
                                            <input disabled required type="password" id="password" className="form-control form-control-lg " value={password} placeholder='Password' />
                                            <label className="form-label  mx-2" htmlFor="password">Password</label>
                                        </div>
                                    </div>



                                    <div className="form-floating mb-3">
                                        <input required type="number" id="mobilenumber" className="form-control form-control-lg" value={mobilenumber} placeholder='mobilenumber' onChange={(e) => setmobilenumber(e.target.value)} />
                                        <label className="form-label" htmlFor="mobilenumber">Mobile Number</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input disabled type="email" id="email" className="form-control form-control-lg" required placeholder='Please Enter Email' value={email} />
                                        <label className="form-label" htmlFor="email">Email Address</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input required type="date" id="dob" value={dob} className="form-control form-control-lg" placeholder='dob' onChange={(e) => { setDob(e.target.value) }} />
                                        <label className="form-label" htmlFor="dob">Date of Birth</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input required type="number" id="adharcard" value={aadharcard} className="form-control form-control-lg" placeholder='adharcard' onChange={(e) => { setAadharcard(e.target.value) }} />
                                        <label className="form-label" htmlFor="Gender">Aadhar Card</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <select required className="form-select form-control" aria-label="Default select example" value={gender} onChange={(e) => { setGender(e.target.value) }}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <label className="form-label" htmlFor="Gender">Gender</label>
                                    </div>
                                    <br />

                                    <div className="mt-4 text-center">
                                        <button className="mx-4 px-4 py-2  btn btn-primary profile-button" type="submit" name="submitbutton" >Update User Account </button>
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
                )}
                {(useremailset=="Not Found") && (
                    <div className='text-danger text-center h2 pb-3'>
                        No User Found
                    </div>
                )}

            </div>
        </div>
    );
}

export default AdminUserprofileUpdate;
