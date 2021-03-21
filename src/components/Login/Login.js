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
                    updateUserInfo(watch().name);
                    const { displayName, email } = userCredential.user;
                    const userData = { name: displayName, email }
                    setLoggedInUser(userData);
                    history.replace(from);
                })
                .catch((error) => {
                    // failed to create user with email and password
                    var errorMessage = error.message;
                    setLoggedInUser({ errorMessage })
                });
        }
        if (!newUser && data.email && data.password) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in with email and password
                    const { displayName, email } = userCredential.user;
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
    // console.log(watch().name);

    // update user info
    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
            const { displayName, email } = user;
            const userData = { name: displayName, email };
            setLoggedInUser(userData);
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }


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
        <div className="container">
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
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

                            <input className="btn btn-secondary btn-round d-block w-100" type="submit" value={newUser ? "Create an account" : "Login"} />
                        </form>

                        <span className="d-block pt-2 text-center">{newUser ? "Already have an account?" : "Don't have an account?"}<Link onClick={() => setNewUser(!newUser)} >{newUser ? "Login" : "Create an account"}</Link></span>

                        <p className="text-center py-4 lead">or</p>
                        <button onClick={handleGoogleSignIn} className="btn btn-light btn-round"><FcGoogle className="fs-2 ms-auto" />Continue with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;