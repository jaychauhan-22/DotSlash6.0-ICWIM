import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Homenav from './homenav';
import "../../index.css"
const Home = () => {
    let navigate = useNavigate();
    const [topusers, setTopUsers] = useState([{}]);
    const [topusersmap, setTopUsersmap] = useState([{}]);
    useEffect(() => {
        if (window.localStorage.getItem("token") == null)
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

                    let mymap = new Map();
                    let newarray = [];
                    
                    let unique = data.filter(el => {
                        let val = mymap.get(el.username);
                        if (val) {
                            let oldpts = mymap.get(el.ttlpt)
                            mymap.set(el.username, val + el.ttlpt);
                            return true;
                        }
                        mymap.set(el.username, el.ttlpt);
                        return true;
                    });
                    mymap.forEach((values, keys) => (
                        newarray.push({value:values,key:keys})
                    ))
                    newarray.map((ele=>{
                        
                    }))
                    setTopUsersmap(newarray);
                    // console.log(newarray);
                    // FetchWardno()

                } else {
                }

            });
        const fetchWardNo = (propertyid)=>{
            fetch(`http://localhost:8000/property/${propertyid}`, {
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
                    

                } else {
                }

            });

        }
    }, []);
    return (
        <div className='text-style'>
            <Homenav />
            <label className='h2 m-4 justify-content-center d-flex'>Top Rankings on the LeaderBoard: </label>
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
                        {/* {
                            topusersmap.forEach((values, keys) => (
                                console.log(values,keys)

                            ))
                            
                        } */}
                        {
                            
                        topusersmap.map((ele, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{ele.key}</td>
                                <td>{ele.value} pts</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
