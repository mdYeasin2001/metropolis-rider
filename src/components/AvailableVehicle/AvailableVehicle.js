import React from 'react';

const AvailableVehicle = ({vehicle}) => {
    const {passengerCapacity, img, rent , vehicleType} = vehicle;
    return (
        <div className="d-flex justify-content-evenly align-items-center my-2 py-2 bg-white rounded">
            <img className="w-25" src={img} alt="vehicle" />
            <h4>{vehicleType.toUpperCase()}</h4>
            <h4>{passengerCapacity}</h4>
            <h4>${rent}</h4>
        </div>
    );
};

export default AvailableVehicle;