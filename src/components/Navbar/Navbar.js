import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { FaUserCircle } from 'react-icons/fa';
import firebase from "firebase/app";
import "firebase/auth";
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setLoggedInUser({})
        }).catch((error) => {
            // An error happened.
        });
    }
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
                        {loggedInUser.email ?
                            <>
                                <Link className="nav-link"><FaUserCircle className="fs-5 mx-2" />{loggedInUser.name}</Link>
                                <Link onClick={handleLogout} to="/" className="btn btn-secondary btn-round">Logout</Link>
                            </> :
                            <Link to="/login" className="btn btn-secondary btn-round">Login</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;