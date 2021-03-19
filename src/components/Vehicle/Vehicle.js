import React from 'react';
import { useHistory } from 'react-router';

const Vehicle = ({ vehicle }) => {
    const { nameVehicle, img } = vehicle;
    const history = useHistory();
    const handleOnClick = () => {
        history.push('/destination')
    }
    return (
        <div class="col">
            <div onClick={handleOnClick} class="card">
                <img src={img} class="card-img-top" alt="vehicle" />
                <h5 class="card-title text-center">{nameVehicle.toUpperCase()}</h5>
            </div>
        </div>
    );
};

export default Vehicle;