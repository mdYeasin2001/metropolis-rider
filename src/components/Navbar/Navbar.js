import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container">
                <Link className="navbar-brand fs-3 fw-bold" to="/">Metropolis <span>Rider</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/destination">Destination</Link>
                        <Link className="nav-link" to="/blog">Blog</Link>
                        <Link className="nav-link" to="/contact">Contact</Link>
                        <Link to="/login" className="btn btn-danger">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;