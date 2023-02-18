import React from 'react';
import { Link } from 'react-router-dom';
import "../../index.css";
const Homenav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
                <div className="container-fluid">
                    <img src="/static/img/logo-no-background.png" alt="Logo" height="50" className="d-inline-block align-text-top mx-2" />
                    <Link to={"/home"} className={"navbar-brand  text-warning"}>
                        ICWIM
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" style={{ justifyContent: "end" }} id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item active">
                                <Link to={"/waste-history"} className={"nav-link text-warning"}>Waste Collection</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link text-warning" to={"/generate-house-tax"}>Generate House Tax</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link  text-warning" to="/userprofile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 20 20">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                        User Profile</Link>
                                </li>
                            </ul>

                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-warning bg-color" type="submit">Search</button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Homenav;
