import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { DotLoader } from "react-spinners";
import CalendarHeatmap from "react-calendar-heatmap";
import Barchart from "./barchart";

import BarChart from "react-bar-chart";
import Homenav from "./homenav";

const data = [
  { text: "Man", value: 500 },
  { text: "Woman", value: 300 },
];
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const Wastehistory = () => {
  const handleBarClick = (element, id) => {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  };
  const [dateState, setDateState] = useState(new Date());
  const [propertyid, setPropertyId] = useState("");
  const [wastecollecteddate, setWasteCollectedDate] = useState("");
  const [weightinkilo, setWeightInKilo] = useState("");
  const [totalpoints, setTotalPoints] = useState("");
  const [pointsperkg, setPointsPerKG] = useState("");
  const [numberofDaysinMonth, setnumberofDaysinMonth] = useState("");


  useEffect((e) => {

    console.log(dateState);
    changeDate();
  }, [dateState]);
  const changeDate = (e) => {
    let datelocal = moment(dateState).format('YYYY-MM-DD');
    let userid = window.localStorage.getItem("token");

    fetch(`http://localhost:8000/waste/${userid}/${datelocal}`, {
      method: "get",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "not found") {
          setPropertyId(data.propertyid);
          setWasteCollectedDate(data.wasteDepositDate);
          setWeightInKilo(data.kilos);
          setTotalPoints(data.ttlpt);
          setPointsPerKG(data.pointsperkg);
        } else {
          setWasteCollectedDate(datelocal);
          setPropertyId("Not Found");
          setWeightInKilo("Not Found");
          setTotalPoints("Not Found");
          setPointsPerKG("Not Found");
        }
        console.log(data);
      });
  };
  const handleCalenderEvent = (e) => {
    setDateState(e);
    let m = moment(dateState).format('MM');
    let y = moment(dateState).format('YYYY');
    let ndate = new Date(y, m, 0).getDate();
    setnumberofDaysinMonth(ndate);
    
  }
  return (
    <>
      <Homenav />
      <div className="container rounded bg-white my-5">
        <div className="row">
          <div className="col-md-4 border-right m-5">
            <u>
              <h2 className="text-right">Waste Collection Record:</h2>
            </u>
            <br />
            <Calendar
              className={"my-3"}
              value={dateState}
              onChange={handleCalenderEvent}
            />

            Analytics about Current Month:
            {numberofDaysinMonth}
            {/* <p>Current selected date is <b>{
                            moment(dateState).format('D/M/YYYY')

                        }
                            <button className='btn btn-primary' onClick={changeDate}>Get Information</button></b></p> */}
            {/* <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="200px" src="/static/img/userprofile.png" />
                            <br />
                            <span className="font-weight-bold h2">username</span>
                            <span className="text-black-50 h5">email</span>
                        </div> */}

          </div>
          <div className="col-md-5 col-sm-12 border-right my-5 mx-3">
            <table class="table table-borderless my-5">
              <tbody>
                <tr>
                  <th scope="row" className='h4'><li>Property ID:</li></th>
                  <td className='h5'>{propertyid}</td>
                </tr>
                <tr>
                  <th scope="row" className='h4'><li>Waste Collected Date:</li></th>
                  <td className='h5'>{wastecollecteddate}</td>
                </tr>
                <br />
                <tr>
                  <th scope="row" className='h4'><u>Collection Details</u></th>
                </tr>
                <tr>
                  <th scope="row" className='h4'><li>In Kilos:</li></th>
                  <td className='h5'>{weightinkilo} KG</td>
                </tr>
                <tr>
                  <th scope="row" className='h4'><li>Total Points:</li></th>
                  <td className='h5'>{totalpoints} pts</td>
                </tr>
                <tr>
                  <th scope="row" className='h4'><li>Points per kg (Then):</li></th>
                  <td className='h5'>{pointsperkg} pts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mx-5 mb-5'>
            <div style={{ width: '90%' }}>
              <Barchart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wastehistory;
