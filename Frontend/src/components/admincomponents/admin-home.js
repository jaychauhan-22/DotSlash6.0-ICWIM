import AdminNavbar from './admin-navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminHome = () => {
    let navigate = useNavigate();
    const [topusers, setTopUsers] = useState([{}]);
    useEffect(() => {
        if (window.localStorage.getItem("admintoken") == null)
            navigate("/");
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8000/waste-sort`, {
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
                    console.log(data);
                    setTopUsers(data);

                } else {
                }
                
            });
    }, []);
    return (
        <div className='text-style'>
            <AdminNavbar />
            <label className='h2 m-4 justify-content-center d-flex'>Top Rankings on the LeaderBoard: </label>
            <div className="container rounded bg-white justify-content-center d-flex my-4 px-5 py-3">
                {console.log(topusers)}
            <table class="table table-hover table-responsive-lg">
                
            <caption>List of users with its corresponding points</caption>
                <thead class="thead-dark table-warning">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">TOTAL POINTS</th>
                    </tr>
                </thead>
                <tbody>
                {topusers.map((ele,index) => (  
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{ele.username}</td>
                        <td>{ele.ttlpt} pts</td>
                    </tr>
                    ))}  
                </tbody>
            </table>
                
            </div>
            
        </div>
    );
}

export default AdminHome;
