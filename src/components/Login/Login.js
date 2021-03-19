import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = data => {
        if (newUser && data.email && data.password) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
        if (!newUser && data.email && data.password) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in
                    var {displayName, email} = userCredential.user;
                    const userData = {name: displayName, email}
                    setLoggedInUser(userData);
                    history.replace(from);
                    
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    setLoggedInUser({errorMessage})
                });
        }
    };

    // console.log(watch("example"));
    return (
        <div className="row pt-5">
            <div className="col-md-4 offset-md-4">
                <div className="card p-3">
                    {newUser ? <h3>Create an account</h3> : <h3>Login</h3>}
                    {loggedInUser.errorMessage && <p className="text-danger">{loggedInUser.errorMessage}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {newUser &&
                            <>
                                <input name="name" className="form-control mb-3" type="text" placeholder="Name" ref={register({ required: true })} required />
                                {errors.name && <span className="text-danger">Name is required</span>}
                            </>
                        }

                        <input name="email" className="form-control mb-3" type="email" placeholder="Email" ref={register({ required: true })} required />
                        {errors.email && <span className="text-danger">Email is required</span>}

                        <input name="password" className="form-control mb-3" type="password" placeholder="Password" ref={register({ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i })} required />
                        {errors.password && <span className="text-danger">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</span>}

                        {newUser &&
                            <>
                                <input name="confirmPassword" className="form-control mb-3" type="password" placeholder="Confirm Password" ref={register({ required: true })} required />
                                {errors.confirmPassword && <span className="text-danger">Password Not matched</span>}
                            </>
                        }

                        <input className="btn btn-primary d-block w-100" type="submit" value={newUser ? "Create an account" : "Login"} />
                    </form>
                    {newUser ?
                        <span className="d-block pt-2 text-center">Already have an account?<Link onClick={() => setNewUser(!newUser)} to="/login">Login</Link></span> :
                        <span className="d-block pt-2 text-center">Don't have an account?<Link onClick={() => setNewUser(!newUser)} to="/register">Create an account</Link></span>
                    }
                    <p className="text-center py-4 lead">or</p>
                    <div className="btn btn-light"><FcGoogle className="fs-2 ms-auto" />Continue with google</div>
                </div>
            </div>
        </div>
    );
};

export default Login;