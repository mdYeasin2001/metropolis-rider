import React, { useEffect, useState } from 'react';
import rideType from '../../fakeData/rideType.json';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(rideType)
    }, [])
    return (
        <div className="home-area">
            <div className="container vehicle-container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {vehicles.map(vehicle => <Vehicle vehicle={vehicle} key={vehicle.id} />)}
                </div>
            </div>
        </div>
    );
};

export default Home;