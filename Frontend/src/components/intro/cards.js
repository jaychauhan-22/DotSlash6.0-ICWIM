import React from "react";
import "./cards.css";

const Cards = () => {
  return (
    <section id="Workflow">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="section-title">
              <h1 className="text-center text-white">How It Works?</h1>
            </div>
            <hr className="border-white mb-4 mt-4" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="work-process">
              <i className="fa fa-building-o"></i>
              <h3>
                <a href="#">Government</a>
              </h3>
              <p>Clean and Green India Initiative.</p>
              <br />
              <br />
            </div>
          </div>
          <div className="col-md-4">
            <div className="work-process">
              <i className="fa fa-users"></i>
              <h3>
                <a href="#">User</a>
              </h3>
              <p>Citizens will get rewards for making the clean india.</p>
              <br />
              <br />
            </div>
          </div>
          <div className="col-md-4">
            <div className="work-process">
              <i className="fa fa-users"></i>
              <h3>
                <a href="#">Nature</a>
              </h3>
              <p>Makes society more
                cleaner.</p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
