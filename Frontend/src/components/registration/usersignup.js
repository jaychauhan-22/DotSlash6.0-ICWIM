import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Usersignup = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilenumber, setmobilenumber] = useState(0);
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [aadharcard, setAadharcard] = useState("");
    const [statusError, setStatusError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/registerUser", {
            method: "POST",
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
                aadharcard: aadharcard,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === "ok") {
                    setStatusError("");
                    alert("Sign Up Successful");
                    navigate(`/login`);
                } else {
                    setStatusError(data.error);
                }
            });


    }
    return (

        <div className='bg-color'>
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="/static/img/logo-no-background.png"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <span className="fs-2 fw-bold text-style">
                                    New User Account Details:
                                </span><br /><br />
                                {statusError !== "" && (
                                    <div>
                                        <p className="text-danger">{statusError}</p>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="form-floating mb-3 col">
                                        <input required type="text" id="username" className="form-control x-3" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} />
                                        <label className="form-label mx-2" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-floating mb-3 col">
                                        <input required type="password" id="password" className="form-control form-control-lg " placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label  mx-2" htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input required type="email" id="email" className="form-control form-control-lg" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input required type="number" id="mobilenumber" className="form-control form-control-lg" placeholder='mobilenumber' onChange={(e) => setmobilenumber(e.target.value)} />
                                    <label className="form-label" htmlFor="mobilenumber">Mobile Number</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input required type="date" id="dob" className="form-control form-control-lg" placeholder='dob' onChange={(e) => setDob(e.target.value)} />
                                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input required type="number" id="adharcard" className="form-control form-control-lg" placeholder='adharcard' onChange={(e) => setAadharcard(e.target.value)} />
                                    <label className="form-label" htmlFor="Gender">Aadhar Card</label>
                                </div>
                                <select required className="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                                    <option selected>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <br />
                                <div className='d-grid gap-2'>
                                    <button type="submit" className="btn btn-warning btn-lg">Create New Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Usersignup;
