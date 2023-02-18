import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    return (
        
        <div>

            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
                <div className="container-fluid">
                    <img src="/static/img/logo-no-background.png" alt="Logo" height="50" className="d-inline-block align-text-top mx-2" />
                    <Link className="navbar-brand  text-warning" to={"/admin-home"}>ICWIM</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" style={{ justifyContent: "end" }} id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item active">
                                <Link to={"/user-registration"} className={"nav-link text-warning"}>New-User</Link>
                            </li>
                            <li class="nav-item active">
                                <Link to={"/user-profileupdate-byadmin"} className={"nav-link text-warning"}>Existing-User</Link>
                            </li>
                            <li class="nav-item active">
                                <Link to={"/waste-collection-entry"} className={"nav-link text-warning"}>Waste-Collection</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link  text-warning" onClick={(e) => {
                                        window.localStorage.removeItem("admintoken")
                                    }} to={"/"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left mx-2" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                        </svg>
                                        Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AdminNavbar;
