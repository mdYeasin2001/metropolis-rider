import React from 'react';
import { RiGroupFill } from 'react-icons/ri';
import { HiCurrencyDollar } from 'react-icons/hi';


const AvailableVehicle = ({vehicle}) => {
    const {passengerCapacity, img, rent , vehicleType} = vehicle;
    return (
        <div className="d-flex justify-content-evenly align-items-center my-2 py-2 bg-white rounded">
            <img className="w-25" src={img} alt="vehicle" />
            <h5>{vehicleType}</h5>
            <h5><RiGroupFill/>{passengerCapacity}</h5>
            <h5><HiCurrencyDollar/>{rent}</h5>
        </div>
    );
};

export default AvailableVehicle;