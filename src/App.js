import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import Destination from './components/Destination/Destination';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Login />
          </Route>
          <PrivetRoute path="/destination">
            <Destination/>
          </PrivetRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
