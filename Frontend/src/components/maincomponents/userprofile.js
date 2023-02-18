import React, {useState,useEffect} from 'react';
import Homenav from './homenav';
import { useNavigate } from "react-router-dom";

const Userprofile = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if(window.localStorage.getItem("token") == null)
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
    useEffect(() => {
        let usertoken = window.localStorage.getItem("token");
        fetch(`http://localhost:8000/user/singleUser/${usertoken}`, {
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
                    
                    setUsername(data.username);
                    setEmail(data.email);
                    setDob(data.dob);
                    setGender(data.gender);
                    setPassword(data.password);
                    setmobilenumber(data.mobileno);
                    setAadharcard(data.aadharcard);

                } else {
                    setStatusError(data.error);
                }
            });

    }, []);
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
                navigate(`/userprofile`);
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
        <div className=''>
            <Homenav/>
            <div className="container rounded bg-white my-4">
                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="200px" src="/static/img/userprofile.png" />
                            <br />
                            <span className="font-weight-bold h2">{username}</span>
                            <span className="text-black-50 h5">{email}</span>
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
                                        <input required type="text" id="username" className="form-control x-3" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <label className="form-label mx-2" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-floating mb-3 col">
                                        <input required type="password" id="password" className="form-control form-control-lg " placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label  mx-2" htmlFor="password">Password</label>
                                    </div>
                                </div>
                                


                                <div className="form-floating mb-3">
                                    <input required type="number" id="mobilenumber" className="form-control form-control-lg" value={mobilenumber} placeholder='mobilenumber' onChange={(e) => setmobilenumber(e.target.value)} />
                                    <label className="form-label" htmlFor="mobilenumber">Mobile Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input disabled type="email" id="email" className="form-control form-control-lg" placeholder='Enter Email' value={email}  />
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input required disabled type="date" id="dob" className="form-control form-control-lg" placeholder='dob' value={dob} />
                                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input disabled required type="number" id="adharcard" className="form-control form-control-lg" placeholder='adharcard' value={aadharcard}/>
                                    <label className="form-label" htmlFor="Gender">Aadhar Card</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <select required disabled className="form-select form-control" aria-label="Default select example" value={gender}>
                                        <option>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <label className="form-label" htmlFor="Gender">Gender</label>
                                </div>
                                <br />
                                {/* <div className="row mt-2">
                                    <div className="form-floating col-md-6 mb-3 col">
                                        <input required type="text" id="username" className="form-control x-3" placeholder='Enter Username' />
                                        <label className="form-label mx-2" htmlFor="username">Username</label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last Name" name="lname" />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">&nbsp;Email</label>
                                        <input type="email" className="form-control"
                                            placeholder="Email"  name="email" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels"><br />&nbsp;Password</label>
                                        <input type="password" className="form-control"
                                            placeholder="New Password"  name="password" minlength="8" maxlength="16" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels"> <br /> &nbsp;College</label>
                                        <input type="text" className="form-control"
                                            placeholder="College Name" name="clg" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels"> <br /> &nbsp;Passing Year of College</label>
                                        <input type="number" className="form-control"
                                            placeholder="Passing Year"  name="pass_year" />
                                    </div>
                                </div>
*/}
                                <div className="mt-4 text-center">
                                    <button className="mx-4 btn btn-primary profile-button" type="submit" name="submitbutton" >Update Profile </button>
                                    <button className="btn btn-warning profile-button" type="button" onClick={logoutUser}>Logout</button>
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

                    {/* <div className="col-md-4">
                        <div className="row">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center experience h4 mb-3"><span>Submitted Responses</span></div>
                                <div className="col-md-12"><label className="labels h5">List of Projects:</label>
                                </div>

                                <div>
                                    <form action="viewprojectdetails.jsp" method="post">
                                        <input type="hidden" name="p_id" value="<%= rst8.getInt(1)%>" />
                                        <input type="hidden" name="org_id" value="<%= rst8.getInt(5)%>" />
                                        <input type="submit" className="btn btn-link" value="<%= rst8.getString(2)%>" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center experience h4 mb-3">
                                    <span>Ongoing Projects</span>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels h5">List of Projects:</label>
                                </div>
                                <div>
                                    <form action="viewprojectdetails.jsp" method="post">
                                        <input type="hidden" name="p_id" value="<%= rst4.getInt(1)%>" />
                                        <input type="hidden" name="org_id" value="<%= rst4.getInt(5)%>" />
                                        <input type="submit" className="btn btn-link" value="<%= rst4.getString(2)%>" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center experience h4 mb-3"><span>Past Performance: </span></div>
                            <div className="col-md-12"><label className="labels h5">List of Previously Earned Certificates:</label></div>
                            <div>
                                <form action="printcertificate.jsp" method="post">
                                    <input type="hidden" name="cid" value="<%= rst4.getInt(1)%>" />
                                    <input type="submit" className="btn btn-link" value="<%= rst5.getString(2)%>" />
                                </form>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default Userprofile;
