import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { VehicleTypeContext } from '../../App';
import './Vehicle.css';

const Vehicle = ({ vehicle }) => {
    const [selectedVehicles, setSelectedVehicles] = useContext(VehicleTypeContext);
    const { vehicleType, img } = vehicle;
    const history = useHistory();
    const handleOnClick = (vehicleType) => {
        setSelectedVehicles(vehicleType);
        history.push('/destination');
    }
    return (
        <div className="col">
            <div onClick={() => handleOnClick(vehicleType)} className="card">
                <img src={img} className="card-img-top" alt="vehicle" />
                <h5 className="card-title text-center">{vehicleType.toUpperCase()}</h5>
            </div>
        </div>
    );
};

export default Vehicle;