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
    


    // authentication provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const onSubmit = data => {
        // console.log(data);
        if (newUser && data.name && data.email && data.password && data.password === data.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Create user with email and password
                    const user = userCredential.user;
                    setLoggedInUser({errorMessage: ''})
                })
                .catch((error) => {
                    // failed to create user with email and password
                    var errorMessage = error.message;
                    setLoggedInUser({errorMessage})
                });
        }
        if (!newUser && data.email && data.password) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in with email and password
                    var { displayName, email } = userCredential.user;
                    const userData = { name: displayName, email }
                    setLoggedInUser(userData);
                    history.replace(from);

                })
                .catch((error) => {
                    // failed to sign in with email and password
                    var errorMessage = error.message;
                    setLoggedInUser({ errorMessage })
                });
        }
    };
    console.log(watch().password, watch().confirmPassword);

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                // signed in with google
                const { displayName, email } = result.user;
                const userData = { name: displayName, email }
                setLoggedInUser(userData);
                history.replace(from);

            }).catch((error) => {
                // failed to sign in with google
                var errorMessage = error.message;
                setLoggedInUser({ errorMessage });
            });
    }

    return (
        <div className="row py-5">
            <div className="col-md-4 offset-md-4">
                <div className="card p-3 cursor-pointer">
                    {newUser ? <h3>Create an account</h3> : <h3>Login</h3>}
                    {loggedInUser.errorMessage && <p className="text-danger">{loggedInUser.errorMessage}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {newUser &&
                            <div className="mb-3">
                                <input name="name" className="form-control" type="text" placeholder="Name" ref={register({ required: true })} />
                                {errors.name && <span className="text-danger">Name is required</span>}
                            </div>
                        }

                        <div className="mb-3">
                            <input name="email" className="form-control" type="email" placeholder="Email" ref={register({ required: true })} />
                            {errors.email && <span className="text-danger">Email is required</span>}
                        </div>

                        <div className="mb-3">
                            <input name="password" className="form-control" type="password" placeholder="Password" ref={register({ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i })} />
                            {errors.password && <span className="text-danger">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</span>}
                        </div>

                        {newUser &&
                            <div className="mb-3">
                                <input name="confirmPassword" className="form-control" type="password" placeholder="Confirm Password" ref={register({ required: true })} />
                                {watch().password === watch().confirmPassword || <span className="text-danger">Password Not matched</span>}
                            </div>
                        }

                        <input className="btn btn-secondary d-block w-100" type="submit" value={newUser ? "Create an account" : "Login"} />
                    </form>
                    {newUser ?
                        <span className="d-block pt-2 text-center">Already have an account?<Link onClick={() => setNewUser(!newUser)} to="/login">Login</Link></span> :
                        <span className="d-block pt-2 text-center">Don't have an account?<Link onClick={() => setNewUser(!newUser)} to="/login">Create an account</Link></span>
                    }
                    <p className="text-center py-4 lead">or</p>
                    <button onClick={handleGoogleSignIn} className="btn btn-light"><FcGoogle className="fs-2 ms-auto" />Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;