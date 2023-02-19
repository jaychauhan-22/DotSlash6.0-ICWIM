import React, { useState,useEffect } from 'react';
import AdminNavbar from './admin-navbar';
import moment from 'moment'
import { useNavigate } from "react-router-dom";

const WasteCollectionEntry = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem("admintoken") == null)
            navigate("/");
    }, []);
    const [findPropertyId, setPropertyId] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [ownername, setOwnerName] = useState("");
    const [statusError, setStatusError] = useState("");
    const [wastecollectiondate, setWasteCollectionDate] = useState(Date());
    const [currentdate, setCurrentdate] = useState("");
    const [wasteinkilo, setWasteInKilo] = useState("");
    const [totalpoints, setTotalPoints] = useState();
    const [pointsperkg, setPointsPerKG] = useState();



    const propertyhandle = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/property/${findPropertyId}`, {
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
                    let usertemp = data.ownerid;
                    setOwnerId(data.ownerid);
                    getusername(data.ownerid);
                    setStatusError("Property Found")
                    
                } else {
                    setStatusError("No Property Found..")
                }
            });
        


    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let wastedepositdate = moment(wastecollectiondate).format('YYYY-MM-D');
        console.log(wastedepositdate);

        fetch("http://localhost:8000/wasteHistory", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userid: ownerId,
                username: ownername,
                propertyid: findPropertyId,
                wasteDepositDate: wastedepositdate,
                kilos: wasteinkilo,
                ttlpt: totalpoints,
                pointsperkg: pointsperkg,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    setStatusError("");
                    alert("Points Updated");
                    navigate(`/admin-home`);
                } else {
                    setStatusError(data.error);
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
                    setOwnerName(data.username);
                } else {
                    // setuserEmailStatus("Not Found");
                }
            });
    }
    return (
        <div className=''>
            <AdminNavbar />
            <div className="container rounded bg-white my-4">
                <form class="d-flex justify-content-center py-3" onSubmit={propertyhandle} role="search">

                    <input class="form-control me-2 w-25" type="search" required placeholder="Enter User's Property ID" aria-label="Search" onChange={(e) => { setPropertyId(e.target.value) }} />
                    <button class="btn btn-warning px-5 py-2" type="submit">Search</button>
                </form>
                {statusError == "Property Found" && (
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5" width="200px" src="/static/img/garbage.png" />
                                <br />
                                <span className="font-weight-bold h2">Collect Waste</span>
                                <span className="text-black-50 h5">Insert the details about the collected waste</span>
                            </div>
                        </div>
                        <div className="col-md-8 border-right">
                            <form onSubmit={handleSubmit}>
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Collected Waste Information by User:</h4>
                                    </div>
                                    <div className="form-floating mb-3 col">
                                        <input required type="text" id="propertyid" value={findPropertyId} className="form-control x-3" placeholder='Enter PropertyId' disabled />
                                        <label className="form-label mx-2" htmlFor="propertyid">PropertyId</label>
                                    </div>


                                    <div className="form-floating mb-3">
                                        <input disabled required type="date" id="wastecollectiondate" value={moment(wastecollectiondate).format('YYYY-MM-D')} className="form-control form-control-lg" placeholder='wastecollectiondate' />
                                        <label className="form-label" htmlFor="dob">Waste Collection Date</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input required type="number" id="wasteinkilo" value={wasteinkilo} className="form-control form-control-lg" placeholder='In Kilo' onChange={(e) => { setWasteInKilo(e.target.value) }} />
                                        <label className="form-label" htmlFor="Gender">In Kilo</label>
                                    </div>

                                    <div className="form-floating mb-3">

                                    <select required className="form-select form-control" aria-label="Default select example" value={pointsperkg} onChange={(e) => {
                                            let v = e.target.value * wasteinkilo;
                                            setTotalPoints(v);
                                            setPointsPerKG(e.target.value)
                                        }}>
                                        <option value="">Select Appropriate Option.</option>
                                        <option value="5">5 pts - For Plastic and Metal Waste</option>
                                        <option value="10">10 pts - For Organic Waste</option>
                                    </select>
                                    <label className="form-label" htmlFor="Gender">Points Per Kilo</label>

{/* 
                                        <input required type="number" id="pointsperkg" value={pointsperkg} className="form-control form-control-lg" placeholder='Points Per KG' onChange={(e) => {
                                            let v = e.target.value * wasteinkilo;
                                            setTotalPoints(v);
                                            setPointsPerKG(e.target.value)
                                        }} />
                                        <label className="form-label" htmlFor="pointsperkg">Points Per KG</label> */}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input disabled required type="number" id="totalpoints" value={totalpoints} className="form-control form-control-lg" placeholder='Total Points' />
                                        <label className="form-label" htmlFor="totalpoints">Total Points</label>
                                    </div>
                                    <br />

                                    <div className="mt-4 text-center">
                                        <button className="mx-4 px-4 py-2  btn btn-primary profile-button" type="submit" name="submitbutton" >Calculate Points </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {statusError == "No Property Found.." && (
                    <div className='text-center py-2'>
                        <p className="text-danger fs-3">{statusError}</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default WasteCollectionEntry;
