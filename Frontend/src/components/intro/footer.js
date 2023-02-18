import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="bg-light text-center text-white">
                {/* <!-- Copyright --> */}
                <div className="text-center p-3 bg-color p-5 fs-5">
                    © 2023 Copyright: &nbsp;
                    <Link className='text-white' to={"/index"}>ICWIM Organization</Link>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
        </div>
    );
}

export default Footer;
