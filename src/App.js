import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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

//context api
export const UserContext = createContext();
export const VehicleTypeContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedVehicles, setSelectedVehicles] = useState("Bike");
  console.log(selectedVehicles);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <VehicleTypeContext.Provider value={[selectedVehicles, setSelectedVehicles]}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivetRoute path="/destination">
              <Destination />
            </PrivetRoute>
          </Switch>
        </Router>
      </VehicleTypeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
