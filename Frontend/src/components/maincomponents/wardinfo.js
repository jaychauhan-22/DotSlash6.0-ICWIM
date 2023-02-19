import React, { useState, useEffect } from 'react';
import Homenav from './homenav';
import { useNavigate } from "react-router-dom";

const Wardinfo = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem("token") == null)
            navigate("/");
    }, []);
    const [wardno, setWardNo] = useState("");
    const [userinfo, setUserInfo] = useState([{}]);
    const [statusError, setStatusError] = useState("");
    const propertyhandle = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/property/ward/${wardno}`, {
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
                console.log(data);
                if (data.status != "error") {
                    setStatusError("Ward Found")
                    let arr = [];
                    arr.push(data);
                    console.log(data);

                    // getusername(data.ownerid);

                } else {
                    setStatusError("No Data Found..")
                }
            });

    }
    
    const getusername = (e)=>{
        console.log(e);
        fetch(`http://localhost:8000/user/singleUser/${e}`, {
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
                    setUserInfo(data.username);
                } else {
                    // setuserEmailStatus("Not Found");
                }
            });
    }
    return (
        <div>
            <Homenav />
            <div className="container rounded bg-white my-4">
                <form class="d-flex justify-content-center py-3" onSubmit={propertyhandle} role="search">

                    <input class="form-control me-2 w-25" type="search" required placeholder="Enter Ward Number" aria-label="Search" onChange={(e) => { setWardNo(e.target.value) }} />
                    <button class="btn btn-warning px-5 py-2" type="submit">Search</button>
                </form>
                {statusError == "Ward Found" && (
                    <div className="row">
                        <label className='h2 m-4 justify-content-center d-flex'>Contribution of the Users in the Given Ward</label>
                        <div className="container rounded bg-white justify-content-center d-flex my-4 px-5 py-3">

                            <table className="table table-hover table-responsive-lg">

                                <caption>List of users with its corresponding points</caption>
                                <thead className="thead-dark table-warning">
                                    <tr>
                                        <th scope="col">#RANK</th>
                                        <th scope="col">USERNAME</th>
                                        <th scope="col">TOTAL POINTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        userinfo.map((ele, index) => (
                                            <tr>
                                                {console.log(ele)}
                                                <th scope="row">{index + 1}</th>
                                                <td>{ele.ownerid}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {statusError == "No Data Found.." && (
                    <div className='text-center py-2'>
                        <p className="text-danger fs-3">{statusError}</p>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Wardinfo;
