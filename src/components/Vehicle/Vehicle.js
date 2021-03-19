import React from 'react';
import { useHistory } from 'react-router';

const Vehicle = ({ vehicle }) => {
    const { nameVehicle, img } = vehicle;
    const history = useHistory();
    const handleOnClick = () => {
        history.push('/destination')
    }
    return (
        <div className="col">
            <div onClick={handleOnClick} className="card">
                <img src={img} className="card-img-top" alt="vehicle" />
                <h5 className="card-title text-center">{nameVehicle.toUpperCase()}</h5>
            </div>
        </div>
    );
};

export default Vehicle;