import React from 'react';
import { Link } from 'react-router-dom';
import "../../index.css";
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <img src="/static/img/logo-no-background.png" alt="Logo" height="50" className="d-inline-block align-text-top mx-2"/>
                    <a className="navbar-brand" href="#">ICWIM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{justifyContent:"end"}} id="navbarSupportedContent">
                        <form className="d-flex" role="search">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
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

export default Navbar;
